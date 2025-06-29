"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BunnyPlayer from "./BunnyPlayer";

const TouchBunny = ({ animationData }: { animationData: unknown }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

	const bunnySize = 144;
	const padding = 8;

	useEffect(() => {
		function updateSize() {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	useEffect(() => {
		if (screenSize.width && screenSize.height) {
			setPosition(generateRandomPosition());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [screenSize]);

	const generateRandomPosition = () => {
		const maxX = screenSize.width - bunnySize - padding;
		// Limit vertical movement to top 40% viewport height
		const maxY = screenSize.height * 0.4 - bunnySize - padding;

		const x = Math.random() * maxX + padding / 2;
		const y = Math.random() * maxY + padding / 2;

		return { x, y };
	};

	const moveRandom = () => {
		setPosition(generateRandomPosition());
	};

	return (
		<motion.div
			className="w-36 h-36 absolute top-0 left-0"
			animate={{ x: position.x, y: position.y }}
			transition={{ type: "spring", stiffness: 120, damping: 20 }}
			onTouchStart={moveRandom}
			onClick={moveRandom}
			style={{ touchAction: "manipulation" }}
		>
			<BunnyPlayer animationData={animationData} />
		</motion.div>
	);
};

export default TouchBunny;
