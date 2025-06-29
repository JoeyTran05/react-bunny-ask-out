import { useState } from "react";
import { motion } from "framer-motion";

const Buttons = () => {
	const [answered, setAnswered] = useState(false);

	if (answered) {
		return (
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				className="text-2xl mt-4 text-pink-600"
			>
				Yay! 🎉 Let&apos;s go!
			</motion.div>
		);
	}

	return (
		<div className="flex gap-4 mt-4">
			<button
				onClick={() => setAnswered(true)}
				className="bg-pink-500 text-white rounded-full px-6 py-2 text-lg shadow hover:bg-pink-600"
			>
				Yes ❤️
			</button>
			<button
				onClick={() => alert("No? 😭 But... I got you a bunny...")}
				className="bg-gray-200 text-gray-700 rounded-full px-6 py-2 text-lg shadow hover:bg-gray-300"
			>
				No 😢
			</button>
		</div>
	);
};

export default Buttons;
