"use client";

import { motion } from "framer-motion";

/* Một bông hoa ly vẽ bằng SVG (kh cần ảnh) */
export const Lily = ({
	petal,
	petalEdge,
	center,
}: {
	petal: string;
	petalEdge: string;
	center: string;
}) => (
	<svg viewBox="-60 -120 120 200" className="w-full h-full">
		{/* thân */}
		<path
			d="M0,80 C -7,45 5,15 0,-4"
			stroke="#6ea36e"
			strokeWidth="4"
			fill="none"
			strokeLinecap="round"
		/>
		{/* lá */}
		<path
			d="M0,52 C -20,42 -34,22 -36,4 C -18,10 -5,28 0,52 Z"
			fill="#7fb77f"
			opacity="0.9"
		/>
		<path
			d="M0,32 C 20,24 32,6 34,-10 C 16,-4 4,12 0,32 Z"
			fill="#6ea36e"
			opacity="0.9"
		/>
		{/* cánh hoa */}
		{[0, 60, 120, 180, 240, 300].map((angle) => (
			<path
				key={angle}
				transform={`rotate(${angle})`}
				d="M0,0 C 14,-24 14,-56 0,-78 C -14,-56 -14,-24 0,0 Z"
				fill={petal}
				stroke={petalEdge}
				strokeWidth="1.5"
			/>
		))}
		{/* nhuỵ */}
		{[-28, -9, 9, 28].map((angle) => (
			<g key={angle} transform={`rotate(${angle})`}>
				<line
					x1="0"
					y1="0"
					x2="0"
					y2="-30"
					stroke={center}
					strokeWidth="1.5"
				/>
				<circle cx="0" cy="-32" r="3.2" fill="#e8a33d" />
			</g>
		))}
		<circle r="6" fill={center} />
	</svg>
);

/* Cánh hoa bay bay */
const Petal = ({ color }: { color: string }) => (
	<svg viewBox="-12 -20 24 40" className="w-full h-full">
		<path
			d="M0,-18 C 9,-8 9,8 0,18 C -9,8 -9,-8 0,-18 Z"
			fill={color}
			opacity="0.85"
		/>
	</svg>
);

const GARDEN = [
	{ left: "2%", size: 120, delay: 0, petal: "#fde2ef", edge: "#f6b6d3", center: "#f191bd" },
	{ left: "16%", size: 88, delay: 0.6, petal: "#ffffff", edge: "#f7c9dd", center: "#ef9ac4" },
	{ left: "31%", size: 104, delay: 1.1, petal: "#fcd9e8", edge: "#f3a8cb", center: "#e87fb4" },
	{ left: "48%", size: 76, delay: 0.3, petal: "#ffffff", edge: "#f7c9dd", center: "#ef9ac4" },
	{ left: "63%", size: 112, delay: 0.9, petal: "#fde2ef", edge: "#f6b6d3", center: "#f191bd" },
	{ left: "78%", size: 84, delay: 1.4, petal: "#fcd9e8", edge: "#f3a8cb", center: "#e87fb4" },
	{ left: "90%", size: 116, delay: 0.2, petal: "#ffffff", edge: "#f7c9dd", center: "#ef9ac4" },
];

const PETALS = [
	{ left: "6%", size: 20, duration: 15, delay: 0, drift: 40, color: "#f9c8de" },
	{ left: "18%", size: 14, duration: 19, delay: 3, drift: -30, color: "#fbd9e8" },
	{ left: "29%", size: 22, duration: 17, delay: 6, drift: 55, color: "#f4b5d3" },
	{ left: "41%", size: 16, duration: 21, delay: 1.5, drift: -45, color: "#fde3ef" },
	{ left: "54%", size: 19, duration: 16, delay: 8, drift: 35, color: "#f9c8de" },
	{ left: "66%", size: 13, duration: 22, delay: 4.5, drift: -25, color: "#fbd9e8" },
	{ left: "77%", size: 23, duration: 18, delay: 10, drift: 50, color: "#f4b5d3" },
	{ left: "88%", size: 17, duration: 20, delay: 2.5, drift: -40, color: "#fde3ef" },
	{ left: "95%", size: 15, duration: 23, delay: 7, drift: 30, color: "#f9c8de" },
];

const FlowerBackground = () => {
	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			{/* vườn hoa ly dưới đáy màn hình */}
			{GARDEN.map((flower, i) => (
				<motion.div
					key={i}
					className="absolute bottom-0 origin-bottom"
					style={{
						left: flower.left,
						width: flower.size,
						height: flower.size * 1.6,
						marginLeft: -flower.size / 2,
					}}
					animate={{ rotate: [-2.5, 2.5, -2.5] }}
					transition={{
						duration: 5 + i * 0.4,
						repeat: Infinity,
						ease: "easeInOut",
						delay: flower.delay,
					}}
				>
					<Lily
						petal={flower.petal}
						petalEdge={flower.edge}
						center={flower.center}
					/>
				</motion.div>
			))}

			{/* cánh hoa rơi */}
			{PETALS.map((petal, i) => (
				<motion.div
					key={i}
					className="absolute"
					style={{
						left: petal.left,
						width: petal.size,
						height: petal.size * 1.6,
						top: "-10%",
					}}
					animate={{
						y: ["0vh", "115vh"],
						x: [0, petal.drift, 0],
						rotate: [0, 220, 360],
					}}
					transition={{
						duration: petal.duration,
						repeat: Infinity,
						ease: "linear",
						delay: petal.delay,
					}}
				>
					<Petal color={petal.color} />
				</motion.div>
			))}
		</div>
	);
};

export default FlowerBackground;
