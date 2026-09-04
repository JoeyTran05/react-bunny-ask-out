"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

import ReturnButton from "@/components/ReturnButton";
import BunnyPlayer from "@/components/BunnyPlayer";
import FlowerBackground, { Lily } from "@/components/FlowerBackground";
import MusicPlayer from "@/components/MusicPlayer";
import bunny_ears from "@/public/bunny_ears.json";
import bunny_holding_carrot from "@/public/bunny_holding_carrot.json";

/* =====================================================================
 *  👉 CHỖ SỬA 1: ngày tụi mình chính thức yêu nhau (yyyy-mm-dd)
 * ===================================================================== */
const START_DATE = "2025-09-04";

/* =====================================================================
 *  👉 CHỖ SỬA 2: nhạc nền
 *  - Bỏ file nhạc vào  public/one-year/  (vd: song.mp3)
 *  - Rồi đổi tên file bên dưới cho khớp
 * ===================================================================== */
const MUSIC_SRC = "/one-year/song.mp3";

/* =====================================================================
 *  👉 CHỖ SỬA 3: hình ảnh (file nằm trong  public/one-year/ )
 *  - Muốn đổi ảnh nào thì sửa src, muốn đổi lời chú thích thì sửa caption
 *  - Để src trống ("") thì chỗ đó hiện khung chờ ảnh, không bị bể trang
 * ===================================================================== */
const PHOTOS = {
	studio: {
		src: "/one-year/48e9d6f1-d8bc-4879-b011-023c920a6e26.jpg",
		hint: "/one-year/studio.jpg",
		caption: "“Tụi mình nè 💕”",
	},
	bangkok1: {
		src: "/one-year/bangkok 1.jpg",
		hint: "/one-year/bangkok 1.jpg",
		caption: "“Bangkok, em mèo giận dữ 📸”",
	},
	bangkok2: {
		src: "/one-year/bangkok 2.jpg",
		hint: "/one-year/bangkok 2.jpg",
		caption: "“Bangkok, chuyến đi xa đầu tiên 🇹🇭”",
	},
	bangkok3: {
		src: "/one-year/bangkok 3.jpg",
		hint: "/one-year/bangkok 3.jpg",
		caption: "“Kỉ niệm vui thì mình giữ, còn lại thì thôi hehe”",
	},
	bangkok4: {
		src: "/one-year/bangkok 4.jpg",
		hint: "/one-year/bangkok 4.jpg",
		caption: "“Đêm cuối đi massage cùng nhau 🌙”",
	},
	firstSight: {
		src: "/one-year/tam dau tien.jpg",
		hint: "/one-year/tam dau tien.jpg",
		caption: "“Tấm hình đầu tiên anh thấy về em 🥺”",
	},
	twoDogs: {
		src: "/one-year/2 con cun.jpg",
		hint: "/one-year/2 con cun.jpg",
		caption: "“Tụi mình nè 🐶🐶”",
	},
	selfie: {
		src: "/one-year/b1ca4ef0-729a-4618-83c4-6e8421784ec6.jpg",
		hint: "/one-year/selfie.jpg",
		caption: "“Đi học bài cùng nhau 💗”",
	},
	dinner: {
		src: "/one-year/facaa33e-c477-43e9-9603-8d4cc4eb9477.jpg",
		hint: "/one-year/dinner.jpg",
		caption: "“Ăn ngon, quà xinh, người thương ngồi kế bên 🍗”",
	},
	favorite: {
		src: "/one-year/yeu thich.jpg",
		hint: "/one-year/yeu thich.jpg",
		caption: "“Tấm anh thích nhất 💗”",
	},
};

/* =====================================================================
 *  👉 CHỖ SỬA 4: nội dung thư
 * ===================================================================== */
const SALUTATION = "Gửi mao, mèo, thỏ, cá nóc, egg head wife của anh,";

const PART_1 = `Hiii, hi hi hi, hi em bé, hehe anh vẫn nhớ mấy lúc em bé hi anhh, anh thích nghe đoạn đó lắm, tới nay đã tròn một năm tụi mình yêu nhau, nhưng mà anh vẫn tiếp tục dc nghe cái giọng đó hehe, anh rất là trân trọng những gì tụi mình làm cho nhau, và cho tới bây giờ vẫn kh tiếp tục làm cho nhau mà kh thay lòng (trộm vía). những ngày tháng qua, giai đoạn xa nhau, mọi thứ có vẻ khó khăn với tụi mình, tụi mình cãi nhau nhiều, xích mích nhiều, nhưng tới cuối cùng vẫn tìm dc giải pháp, và tiếng nói chung, anh rất là vui và trân trọng điều đó.`;

const PART_2 = `Một năm qua tụi mình làm dc rất nhiều thứ cùng nhau, có những thứ nhỏ có những thứ to lớn, và thứ làm anh nhớ và vui nhất là dc đi du lịch xa cùng nhau. Địa điểm đầu tiên là Bangkok hehe, tuy là cuộc vui chưa dc trọn vẹn bởi vì em còn dỗi anh nhìu haha, nhưng sau cùng những thứ mình nhớ chỉ là những kỉ niệm vui.`;

const PART_3 = `Và thứ vui nhất và nhớ nhất của anh là vào đêm cuối cùng, lúc anh xuống nhà lang thang một mình, em đã chạy theo anh và đi với anh mặc dù em khá là mệt và buồn ngủ, lúc đó anh chỉ thấy thương em vì anh nghĩ nếu là ai khác thì chắc người ta sẽ kh làm dc điều đó.`;

const PART_4 = `Một năm trc, anh còn đang hồi hộp nhắn tin cho em, sợ em kh rep, sợ mình nói gì đó nhảm nhí và em ghost anh hehe, và cũng đúng ngày này một năm trc, có một con cún tỏ tình một con mèo hehe. Thế mà bây giờ, hai con cún và mèo đã thân thiết tới mức, còn mèo hay làm những trò ngố trước con cún, và suốt ngày tỏ ra đáng yêu dễ thương với con cún hehe.`;

/* đoạn này có câu hỏi có / hong cho em bé bấm */
const PART_5 = `Anh kh giỏi nói mấy lời ngọt ngào sến súa đâu hehe, nhưng mà anh đã cho em thấy được một năm qua những gì anh nói là anh làm đc, và anh chăm sóc và đã là một người bạn trai tốt với em hehe`;
const PART_5_QUESTION = "em có thấy z kh?";

const PART_6 = `Kh ngờ là thời gian trôi nhanh như vậy, mới đây đã một năm, và hi vọng là sẽ còn nhiều năm nữa đc ở bên nhau, đi du lịch cùng nhau nhiều, thành công cùng nhau và trưởng thành cùng nhau hehe.`;

const PART_7 = `Anh muốn nói là anh yêu em rất nhiều và em kh cần và kh dc phép nghi ngờ về điều đó, hehe, cún nói tới đây thui tạm biệt mèo.`;

const FLOWER_NOTE = `Đọc xong thì hãy check in cùng hoa anh tặng ná hehe (hoa ly đó hoa em thích)`;

const SIGN_OFF = "Thân gửi,";
const SIGN_NAME = "Anh cún";

/* 👉 CHỖ SỬA 5: mấy điều khoản cho vui (gia hạn hợp đồng) */
const CONTRACT_TERMS = [
	"Bên A (anh cún) cam kết thương mèo thêm 365 ngày nữa, không thiếu ngày nào 💌",
	"Bên B (con mèo) được quyền nhõng nhẽo và làm trò ngố vô thời hạn 🐱",
	"Giận nhau xong phải nói chuyện tới khi tìm được tiếng nói chung 🤝",
	"Năm sau phải đi du lịch xa cùng nhau thêm ít nhất một chuyến ✈️",
];

const fadeInVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (delay: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, delay },
	}),
};

type PhotoSlot = (typeof PHOTOS)[keyof typeof PHOTOS];

const Photo = ({
	photo,
	className,
	frame = "aspect-[3/4]",
	width = 800,
	height = 800,
}: {
	photo: PhotoSlot;
	className?: string;
	/* tỉ lệ khung hình: aspect-[3/4] đứng, aspect-[4/3] ngang, aspect-square vuông */
	frame?: string;
	width?: number;
	height?: number;
}) => {
	return (
		<figure className={className}>
			<div
				className={`rounded-xl overflow-hidden shadow-md border-4 border-pink-200 bg-white ${
					photo.src ? frame : ""
				}`}
			>
				{photo.src ? (
					<Image
						src={photo.src}
						alt={photo.caption}
						width={width}
						height={height}
						className="object-cover w-full h-full"
					/>
				) : (
					<div className="flex h-44 flex-col items-center justify-center gap-1 border-2 border-dashed border-pink-300 bg-pink-50 px-3 text-center">
						<span className="text-2xl">📷</span>
						<span className="text-xs text-pink-400 break-all">
							{photo.hint}
						</span>
					</div>
				)}
			</div>
			{photo.caption && (
				<figcaption className="mt-2 text-center italic text-sm text-pink-700">
					{photo.caption}
				</figcaption>
			)}
		</figure>
	);
};

/* Một khối chữ của lá thư */
const LetterCard = ({
	children,
	delay = 0.2,
}: {
	children: React.ReactNode;
	delay?: number;
}) => (
	<motion.div
		className="bg-white/95 rounded-2xl shadow-lg p-6 mb-8 border-2 border-pink-300 w-full"
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, amount: 0.15 }}
		variants={fadeInVariants}
		custom={delay}
	>
		<p className="text-pink-700 text-lg leading-relaxed whitespace-pre-line">
			{children}
		</p>
	</motion.div>
);

const OneYear = () => {
	const [days, setDays] = useState<number | null>(null);

	/* câu hỏi giữa thư: em có thấy z kh? */
	const [saidYes, setSaidYes] = useState(false);
	const [showNoModal, setShowNoModal] = useState(false);

	/* câu hỏi cuối thư: gia hạn thêm 1 năm */
	const [answered, setAnswered] = useState(false);
	const [noPos, setNoPos] = useState({ x: 0, y: 0 });
	const [teases, setTeases] = useState(0);
	const noButtonRef = useRef<HTMLButtonElement>(null);
	const noBaseRef = useRef<{ left: number; right: number } | null>(null);

	useEffect(() => {
		const start = new Date(START_DATE).getTime();
		const diff = Date.now() - start;
		setDays(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));
	}, []);

	const heartBurst = () => {
		confetti({
			particleCount: 90,
			spread: 70,
			scalar: 1.2,
			origin: { y: 0.7 },
			colors: ["#ef9ac4", "#f4b5d3", "#ffffff", "#e8619d"],
		});
	};

	/* nút "Để suy nghĩ" chạy trốn, nhưng kh dc chạy ra khỏi màn hình
	   (trên điện thoại màn hình hẹp nên phải giới hạn lại) */
	const runAway = () => {
		let x = (Math.random() - 0.5) * 220;
		const y = (Math.random() - 0.5) * 90;

		const button = noButtonRef.current;
		if (button) {
			if (!noBaseRef.current) {
				const rect = button.getBoundingClientRect();
				noBaseRef.current = {
					left: rect.left - noPos.x,
					right: rect.right - noPos.x,
				};
			}
			const { left, right } = noBaseRef.current;
			const minX = 12 - left;
			const maxX = window.innerWidth - 12 - right;
			x = Math.max(minX, Math.min(x, maxX));
		}

		setNoPos({ x, y });
		setTeases((t) => t + 1);
	};

	const sayYes = () => {
		setAnswered(true);
		confetti({ particleCount: 200, spread: 110, origin: { y: 0.6 } });
		setTimeout(
			() =>
				confetti({
					particleCount: 120,
					spread: 80,
					origin: { x: 0.2, y: 0.7 },
				}),
			250,
		);
		setTimeout(
			() =>
				confetti({
					particleCount: 120,
					spread: 80,
					origin: { x: 0.8, y: 0.7 },
				}),
			450,
		);
	};

	return (
		<main className="min-h-screen bg-pink-100 relative overflow-hidden">
			<FlowerBackground />
			<MusicPlayer src={MUSIC_SRC} />

			<div className="relative z-10 flex flex-col items-center px-6 pt-20 pb-40 max-w-md mx-auto">
				<ReturnButton />

				{/* Tiêu đề */}
				<motion.h1
					className="text-3xl font-bold text-pink-700 mb-2 text-center animate-bounce"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0}
				>
					💌 1 năm của tụi mình 💌
				</motion.h1>

				<motion.p
					className="text-pink-600 mb-6 text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.1}
				>
					{days === null
						? "đang đếm..."
						: `${days} ngày thương em rồi đó 🐰`}
				</motion.p>

				<div className="w-40 h-40 mb-6">
					<BunnyPlayer animationData={bunny_ears} />
				</div>

				{/* Lời chào đầu thư */}
				<motion.p
					className="w-full text-pink-700 text-lg italic font-semibold mb-4"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.15}
				>
					{SALUTATION}
				</motion.p>

				<LetterCard>{PART_1}</LetterCard>

				{/* Ảnh studio của tụi mình */}
				<motion.div
					className="w-full mb-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.studio}
						className="rotate-[-2deg]"
						frame="aspect-[3/2]"
					/>
				</motion.div>

				<LetterCard>{PART_2}</LetterCard>

				{/* Bangkok 1 + 2 */}
				<motion.div
					className="grid grid-cols-2 gap-4 mb-6 w-full"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.bangkok1}
						className="rotate-[-3deg]"
						frame="aspect-[3/4]"
					/>
					<Photo
						photo={PHOTOS.bangkok2}
						className="rotate-[2deg]"
						frame="aspect-[3/4]"
					/>
				</motion.div>

				{/* Bangkok 3 */}
				<motion.div
					className="w-full mb-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.bangkok3}
						className="rotate-[2deg]"
						frame="aspect-[3/2]"
					/>
				</motion.div>

				<LetterCard>{PART_3}</LetterCard>

				{/* Bangkok 4 - đêm cuối cùng */}
				<motion.div
					className="w-full mb-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.bangkok4}
						className="rotate-[-2deg]"
						frame="aspect-[3/2]"
					/>
				</motion.div>

				<LetterCard>{PART_4}</LetterCard>

				{/* Tấm đầu tiên anh thấy về em + hai con cún */}
				<motion.div
					className="grid grid-cols-2 gap-4 mb-8 w-full"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.firstSight}
						className="rotate-[2deg]"
						frame="aspect-[3/4]"
					/>
					<Photo
						photo={PHOTOS.twoDogs}
						className="rotate-[-3deg]"
						frame="aspect-[3/4]"
					/>
				</motion.div>

				{/* ===== Đoạn có câu hỏi: em có thấy z kh? ===== */}
				<motion.div
					className="bg-white/95 rounded-2xl shadow-lg p-6 mb-8 border-2 border-pink-300 w-full"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
					variants={fadeInVariants}
					custom={0.2}
				>
					<p className="text-pink-700 text-lg leading-relaxed whitespace-pre-line">
						{PART_5}{" "}
						<span className="font-semibold text-pink-600">
							{PART_5_QUESTION}
						</span>
					</p>

					{!saidYes ? (
						<div className="mt-5 flex flex-wrap gap-3 justify-center">
							<button
								type="button"
								onClick={() => {
									setSaidYes(true);
									heartBurst();
								}}
								className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 shadow"
							>
								Dạ có 🥰
							</button>
							<button
								type="button"
								onClick={() => setShowNoModal(true)}
								className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300"
							>
								Hong 😝
							</button>
						</div>
					) : (
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="mt-5 text-center text-pink-600 font-semibold"
						>
							Hehe anh biết ngay mà 🥰💗
						</motion.p>
					)}
				</motion.div>

				<AnimatePresence>
					{showNoModal && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
						>
							<div className="bg-white shadow-xl rounded-xl px-6 py-4 border border-pink-200 text-center w-[90vw] max-w-sm">
								<h3 className="text-lg font-semibold text-pink-700">
									😤 Xạo quá hehe, bấm lại coi! 🐶
								</h3>
								<p className="text-gray-600 mt-2">
									Cún cho mèo chọn lại đó ={")))"}
								</p>
								<button
									onClick={() => setShowNoModal(false)}
									className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
								>
									Chọn lại
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<LetterCard>{PART_6}</LetterCard>

				{/* Selfie + bữa ăn */}
				<motion.div
					className="grid grid-cols-2 gap-4 mb-8 w-full"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.selfie}
						className="rotate-[-2deg]"
						frame="aspect-square"
					/>
					<Photo
						photo={PHOTOS.dinner}
						className="rotate-[3deg]"
						frame="aspect-square"
					/>
				</motion.div>

				<LetterCard>{PART_7}</LetterCard>

				{/* Tấm anh thích nhất */}
				<motion.div
					className="w-full mb-8 flex flex-col items-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.3}
				>
					<Photo
						photo={PHOTOS.favorite}
						className="w-4/5 rotate-[2deg]"
						frame="aspect-[3/4]"
					/>
				</motion.div>

				{/* Lời nhắn về bó hoa ly */}
				<motion.div
					className="w-full bg-pink-50/95 rounded-2xl shadow-lg p-6 mb-8 border-2 border-pink-300"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
					variants={fadeInVariants}
					custom={0.2}
				>
					<div className="flex justify-center gap-1 mb-2">
						{[0, 1, 2].map((i) => (
							<motion.div
								key={i}
								className="w-16 h-24 origin-bottom"
								animate={{ rotate: [-3, 3, -3] }}
								transition={{
									duration: 4 + i,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								<Lily
									petal="#ffffff"
									petalEdge="#f6b6d3"
									center="#ef9ac4"
								/>
							</motion.div>
						))}
					</div>
					<p className="text-pink-700 text-lg leading-relaxed text-center">
						{FLOWER_NOTE}
					</p>
				</motion.div>

				{/* Ký tên */}
				<motion.div
					className="w-full text-right mb-10"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.2}
				>
					<p className="text-pink-700 italic">{SIGN_OFF}</p>
					<p className="text-2xl font-bold text-pink-600">
						{SIGN_NAME} 🐶
					</p>
				</motion.div>

				{/* ================= Câu hỏi cuối thư ================= */}
				<motion.section
					className="w-full bg-white rounded-2xl shadow-xl p-6 border-2 border-pink-400 mb-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
					variants={fadeInVariants}
					custom={0.2}
				>
					<h2 className="text-2xl font-bold text-pink-700 text-center">
						📜 Đơn xin gia hạn thêm 1 năm 📜
					</h2>
					<p className="text-center text-pink-500 text-sm mt-1 mb-4">
						Hợp đồng yêu đương năm thứ nhất hết hạn hôm nay rồi ạ 🥺
					</p>

					<ul className="flex flex-col gap-2 mb-6">
						{CONTRACT_TERMS.map((term, i) => (
							<li
								key={i}
								className="text-pink-700 text-sm leading-relaxed bg-pink-50 rounded-lg px-3 py-2"
							>
								{term}
							</li>
						))}
					</ul>

					{!answered ? (
						<>
							<h3 className="text-xl font-semibold text-center text-pink-700 mb-4">
								Mèo ký gia hạn thêm 1 năm với cún nha? 🥺
							</h3>
							<div className="flex gap-4 justify-center items-center min-h-16">
								<button
									type="button"
									onClick={sayYes}
									className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 shadow"
								>
									Dạaa, ký liền! ❤️
								</button>
								<motion.button
									ref={noButtonRef}
									type="button"
									animate={{ x: noPos.x, y: noPos.y }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 18,
									}}
									onMouseEnter={runAway}
									onTouchStart={runAway}
									onClick={runAway}
									className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full"
								>
									Để suy nghĩ 😗
								</motion.button>
							</div>
							{teases > 0 && (
								<p className="text-center text-pink-500 text-sm mt-4">
									{teases < 3
										? "Nút đó bấm hông được đâu em ơi 😚"
										: "Thôi đừng cố nữa, bấm nút hồng đi mà 🐰💕"}
								</p>
							)}
						</>
					) : (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="text-center"
						>
							<div className="inline-block border-4 border-pink-500 text-pink-600 font-bold text-xl px-6 py-2 rounded-xl rotate-[-8deg]">
								ĐÃ KÝ ✓
							</div>
							<p className="text-pink-700 text-lg mt-5 leading-relaxed">
								Hợp đồng đã dc gia hạn thêm 365 ngày nữa rồi nha
								🥰 Cảm ơn mèo vì một năm vừa rồi, và cảm ơn mèo
								vì đã đồng ý ở lại thêm một năm nữa với anh cún.
								Anh yêu em nhiều lắm 💗
							</p>
							<div className="w-32 h-32 mx-auto mt-4">
								<BunnyPlayer
									animationData={bunny_holding_carrot}
								/>
							</div>
						</motion.div>
					)}
				</motion.section>

				<p className="text-center text-pink-600 mt-2 text-lg">
					🌸 Em vẫn luôn là điều ngọt ngào nhất trong cuộc đời anh 🌸
				</p>
			</div>
		</main>
	);
};

export default OneYear;
