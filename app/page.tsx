// app/letters/page.tsx
"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { Section } from "./taothumoi/editor/page";

const letters_old = [
	{
		id: "1",
		title: "Mời Em Thỏ Xem Phim",
		url: "moiemtho",
		date: "29/6/2025",
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
		date: "22/9/2025",
	},
];

interface Letter {
	id: string;
	title: string;
	color: string;
	sections: Section[];
	created_at: string;
}

const LettersMenu = () => {
	const [letters, setLetters] = useState<Letter[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLetters = async () => {
			try {
				const supabase = createSupabaseClient();
				const { data, error } = await supabase
					.from("letters")
					.select("*")
					.order("created_at", { ascending: false });

				if (error) throw error;
				setLetters(data || []);
			} catch (err) {
				console.error("Error fetching letters:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchLetters();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen text-pink-500">
				<Loader2 className="animate-spin mr-2" /> Loading letters...
			</div>
		);
	}
	return (
		<main className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
			<h1 className="text-2xl font-bold text-pink-700 mb-6">
				💌 Thư Của Em Thỏ
			</h1>

			<div className="grid gap-4 w-full max-w-md">
				{letters_old.map((letter) => (
					<Link
						key={letter.id}
						href={`/${letter.url}`}
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
				{letters.map((letter) => (
					<Link
						key={letter.id}
						href={`/letters/${letter.id}`}
						className="block bg-white shadow-md rounded-xl p-4 border border-pink-100 hover:bg-pink-100 transition"
					>
						<h2 className="text-xl font-semibold text-pink-700 mb-2">
							{letter.title}
						</h2>
						<p className="text-gray-500 text-sm mt-1">
							{new Date(letter.created_at).toLocaleDateString()}
						</p>
					</Link>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
			<div className="fixed bottom-6 right-6 z-50">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size="icon"
							className="rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg w-14 h-14 flex items-center justify-center animate-pulse"
						>
							<Plus className="h-6 w-6 text-white" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="bg-white shadow-lg border-pink-100"
					>
						<DropdownMenuItem className="text-pink-600 cursor-pointer">
							<Link href={`/taothumoi/new`}>
								Create New Letter
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => alert("✏️ Edit existing letter")}
							className="text-pink-600 cursor-pointer"
						>
							Edit Letter
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</main>
	);
};

export default LettersMenu;
