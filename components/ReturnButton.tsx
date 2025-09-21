import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

const ReturnButton = () => {
	return (
		<Link
			href="/"
			className="absolute top-4 left-4 bg-white text-pink-600 px-3 py-1 rounded-full shadow hover:bg-pink-100 transition"
		>
			<ArrowLeft className="w-6 h-6" />{" "}
		</Link>
	);
};

export default ReturnButton;
