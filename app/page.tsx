// app/letters/page.tsx
"use client";

import Link from "next/link";

const letters = [
	{
		id: "1",
		title: "Mời Em Thỏ Xem Phim",
		url: "moiemtho",
		date: "hong nhớ nữa",
	},
	{
		id: "2",
		title: "Girlfriend's Day 💕",
		url: "girlfriends-day",
		date: "1/8/2025",
	},
	{
		id: "3",
		title: "Lần Đầu Gặp Nhau 🌙",
		url: "first-time-meeting",
		date: "1/9/2025",
	},
	{
		id: "4",
		title: "3 tháng ✨",
		url: "three-months",
		date: "21/9/2025",
	},
];

export default function LettersMenu() {
	return (
		<main className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
			<h1 className="text-2xl font-bold text-pink-700 mb-6">
				💌 Thư Của Em Thỏ
			</h1>

			<div className="grid gap-4 w-full max-w-md">
				{letters.map((letter) => (
					<Link
						key={letter.id}
						href={`/thuchoemtho/${letter.url}`}
						className="block bg-white shadow-md rounded-xl p-4 border border-pink-100 hover:bg-pink-100 transition"
					>
						<h2 className="text-lg font-semibold text-pink-600">
							{letter.title}
						</h2>
						<p className="text-gray-500 text-sm mt-1">
							{letter.date}
						</p>
					</Link>
				))}
			</div>
		</main>
	);
}
