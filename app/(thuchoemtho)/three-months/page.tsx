"use client";

import Image from "next/image";
import ReturnButton from "@/components/ReturnButton";
import { motion } from "framer-motion";

const fadeInVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (delay: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, delay },
	}),
};

const ThreeMonths = () => {
	return (
		<main className="min-h-screen bg-pink-100 relative overflow-hidden">
			<div className="flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto z-10">
				<ReturnButton />

				{/* Title */}
				<motion.h1
					className="text-3xl font-bold text-pink-700 mb-6 text-center animate-bounce"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0}
				>
					💌 Anni 3 tháng 💌
				</motion.h1>

				{/* First part of letter */}
				<motion.div
					className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-pink-300"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.2}
				>
					<p className="text-pink-700 text-lg leading-relaxed text-center">
						Em bé à, cảm giác như thời gian ở bên cạnh nhau nó trôi
						nhanh hơn là lúc ở xa nhỉ, mới đây mà đã gần một tháng
						gặp nhau, mỗi khoảnh khắc bên em đều thật sự đáng nhớ.
						Càng gặp em nhiều anh càng cảm thấy mình thật sự may mắn
						khi quen được em. Mỗi lần nhìn em là mỗi lần anh nghĩ
						không hiểu sao anh có thể tán được một người xinh như z.
						Giờ anh mới biết là lúc ở xa thỏ mếu vì nhớ anh đấy haha
						🐰💖
					</p>
				</motion.div>

				{/* Cute photo collage in the middle */}
				<motion.div
					className="grid grid-cols-2 gap-4 mb-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.4}
				>
					<div className="rounded-xl overflow-hidden shadow-md border-4 border-pink-200 rotate-[-3deg]">
						<Image
							src="/three-months/us1.jpg"
							alt="us together"
							width={200}
							height={200}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="rounded-xl overflow-hidden shadow-md border-4 border-pink-200 rotate-[2deg]">
						<Image
							src="/three-months/us2.jpg"
							alt="smile"
							width={200}
							height={200}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="rounded-xl overflow-hidden shadow-md border-4 border-pink-200 rotate-[4deg] col-span-2">
						<Image
							src="/three-months/us3.jpg"
							alt="memories"
							width={400}
							height={250}
							className="object-cover w-full h-full"
						/>
					</div>
				</motion.div>

				{/* Second part of letter */}
				<motion.div
					className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-pink-300"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.6}
				>
					<p className="text-pink-700 text-lg leading-relaxed text-center">
						3 tháng qua cùng em thỏ thật sự tuyệt vời, tuy cũng có
						những lúc chưa vui, những lúc anh “hư hỏng” nhưng em thỏ
						vẫn thương và yêu anh nhiều 🥹. Cảm ơn em đã chờ anh và ở
						bên anh 3 tháng qua. Em cũng là bạn gái top 1 server của
						chồng và mong là tụi mình sẽ còn nhiều những kỉ niệm
						khác cùng nhau ạ!
						<br />
						<span className="font-semibold text-pink-600">
							Anh yêu em 💕 Anh Bảo
						</span>
					</p>
				</motion.div>

				<motion.div
					className="flex flex-col items-center gap-8 mb-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeInVariants}
					custom={0.8}
				>
					{/* First image with quote */}
					<div className="flex flex-col items-center">
						<Image
							src="/three-months/us4.jpg"
							alt="Sweet memory 1"
							width={280}
							height={200}
							className="rounded-2xl shadow-md border-4 border-pink-200 object-cover"
						/>
						<p className="mt-3 text-pink-700 text-center italic text-base">
							“Lần đầu đi ăn cùng bố mẹ anh 💕”
						</p>
					</div>

					{/* Second image with quote */}
					<div className="flex flex-col items-center">
						<Image
							src="/three-months/us5.jpg"
							alt="Sweet memory 2"
							width={280}
							height={200}
							className="rounded-2xl shadow-md border-4 border-pink-200 object-cover"
						/>
						<p className="mt-3 text-pink-700 text-center italic text-base">
							“Lần thứ hai đi ăn ốc, tấm này mặt nhìn tướng phu
							thê dữ 🌸”
						</p>
					</div>
				</motion.div>

				{/* Closing message */}
				<p className="text-center text-pink-600 mt-4 text-lg">
					🌸 Em luôn là điều ngọt ngào nhất trong cuộc đời anh 🌸
				</p>
			</div>
		</main>
	);
};

export default ThreeMonths;
