"use client";

import { useState } from "react";
import BunnyPlayer from "@/components/BunnyPlayer";
import bunny_ears from "@/public/bunny_ears.json";
import bunny_in_hat from "@/public/bunny_in_hat.json";
import bunny_holding_carrot from "@/public/bunny_holding_carrot.json";
import bunny_in_present from "@/public/bunny_in_present.json";
import TouchBunny from "@/components/TouchBunny";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
	const [clicked, setClicked] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<main className="min-h-screen bg-pink-50 relative overflow-hidden">
			{!clicked ? (
				<div
					onClick={() => setClicked(true)}
					className="flex flex-col items-center justify-center min-h-screen cursor-pointer p-4"
				>
					<BunnyPlayer
						animationData={bunny_in_present}
						className="w-60 h-60"
					/>
					<p className="text-lg text-pink-700 mt-4">
						Em thỏ bấm vô hộp quà đi ={"))))"} 🎁
					</p>
				</div>
			) : (
				<div className="flex flex-col items-center">
					{/* Bunnies move only in top 40% viewport */}
					<div className=" w-full h-[40vh] z-0">
						<TouchBunny animationData={bunny_holding_carrot} />
						<TouchBunny animationData={bunny_in_hat} />
					</div>

					{/* Form fixed at bottom */}
					<div className="flex flex-col w-full p-6 max-w-md mx-auto z-10">
						<div className=" w-full flex justify-center">
							<div className="mb-8 w-40 h-40">
								<BunnyPlayer animationData={bunny_ears} />
							</div>
						</div>

						<form className="flex flex-col gap-4 w-full bg-white p-6 shadow-lg rounded-t-xl">
							<h2 className="text-xl font-semibold text-center text-pink-700">
								Ngày mai em thỏ coi phim với anh téo nha? 🥺
							</h2>

							<div className="flex gap-4 justify-center">
								<button
									type="button"
									onClick={() => {
										confetti({
											particleCount: 150,
											spread: 100,
											origin: { y: 0.6 },
										});
									}}
									className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
								>
									Yes! ❤️
								</button>
								<button
									type="button"
									onClick={() => setShowModal(true)}
									className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300"
								>
									No 😢
								</button>
							</div>
						</form>
						<span className="text-center p-6  text-xl text-pink-700">
							Bấm vô mấy con thỏ là nó di chuyển á ={"))))"}
						</span>

						<AnimatePresence>
							{showModal && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{
										duration: 0.4,
										ease: "easeOut",
									}}
									className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
								>
									<div className="bg-white shadow-xl rounded-xl px-6 py-4 border border-pink-200 text-center w-[90vw] max-w-sm">
										<h3 className="text-lg font-semibold text-pink-700">
											😢 Kệ em, em vẫn phải coi với anh!
											🐰
										</h3>
										<p className="text-gray-600 mt-2">
											Cho em chọn lại đó ={")))"} 🐰
										</p>
										<button
											onClick={() => setShowModal(false)}
											className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
										>
											Close
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			)}
		</main>
	);
};

export default Home;
