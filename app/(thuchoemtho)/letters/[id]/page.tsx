"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ReturnButton from "@/components/ReturnButton";

interface Section {
	id: string;
	type: "text" | "image" | "image-quote";
	layout?: "single" | "double" | "triple";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content: any;
}

interface Letter {
	id: string;
	title: string;
	color: string;
	sections: Section[];
}

export default function LetterDetail() {
	const { id } = useParams();
	const [letter, setLetter] = useState<Letter | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchLetter = async () => {
			try {
				const supabase = createSupabaseClient();
				const { data, error } = await supabase
					.from("letters")
					.select("*")
					.eq("id", id)
					.single();

				if (error) throw error;
				setLetter(data);
			} catch (err) {
				console.error("Error fetching letter:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchLetter();
	}, [id]);

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen text-pink-500">
				<Loader2 className="animate-spin mr-2" /> Loading letter...
			</div>
		);

	if (!letter)
		return (
			<div className="flex flex-col items-center justify-center h-screen text-pink-500">
				<p>Letter not found 😢</p>
				<Button
					className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
					onClick={() => router.push("/letters")}
				>
					Back to Letters
				</Button>
			</div>
		);

	return (
		<div
			className="min-h-screen p-6 flex flex-col items-center"
			style={{ backgroundColor: letter.color }}
		>
			<ReturnButton />

			<h1 className="text-pink-700 text-3xl font-semibold mb-8 text-center">
				{letter.title}
			</h1>

			<div className="w-full max-w-md space-y-6">
				{letter.sections.map((section, i) => (
					<motion.div
						key={section.id || i}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.05 }}
						className="bg-white/80 p-4 rounded-2xl shadow"
					>
						{/* Text Section */}
						{section.type === "text" && (
							<p className="text-pink-700 text-lg leading-relaxed whitespace-pre-wrap">
								{section.content}
							</p>
						)}

						{/* Image Section */}
						{section.type === "image" && (
							<div className="grid grid-cols-2 gap-4">
								{section.content.map(
									(img: string, index: number) => (
										<div
											key={index}
											className={`rounded-xl overflow-hidden shadow-md border-4 border-pink-200 ${
												section.layout === "triple" &&
												index === 2
													? "col-span-2"
													: ""
											}`}
										>
											<Image
												src={img}
												alt={`img-${index}`}
												width={400}
												height={300}
												className="object-cover w-full h-full"
											/>
										</div>
									)
								)}
							</div>
						)}

						{/* Image Quote Section */}
						{section.type === "image-quote" && (
							<div className="flex flex-col items-center gap-3">
								<div className="rounded-xl overflow-hidden shadow-md border-4 border-pink-200 w-full max-w-sm">
									<Image
										src={section.content.image}
										alt="quote image"
										width={400}
										height={300}
										className="object-cover w-full h-full"
									/>
								</div>
								<p className="text-center text-pink-700 italic font-[Dancing Script] text-lg">
									“{section.content.quote}”
								</p>
							</div>
						)}
					</motion.div>
				))}
			</div>
		</div>
	);
}
