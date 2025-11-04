"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ImageLayoutModal from "@/components/ImageLayoutModal";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type Section =
	| {
			id: string;
			type: "text";
			content: string;
	  }
	| {
			id: string;
			type: "image";
			layout: "single" | "double" | "triple";
			content: string[]; // list of image URLs
	  }
	| {
			id: string;
			type: "image-quote";
			content: { image: string; quote: string };
	  };

export default function LetterEditor() {
	const [info, setInfo] = useState<{ title: string; color: string } | null>(
		null
	);
	const [sections, setSections] = useState<Section[]>([]);
	const [showLayoutModal, setShowLayoutModal] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const saved = localStorage.getItem("newLetterInfo");
		if (saved) setInfo(JSON.parse(saved));
	}, []);

	// 📝 Add new text section
	const addTextSection = () => {
		setSections((prev) => [
			...prev,
			{ id: crypto.randomUUID(), type: "text", content: "" },
		]);
	};

	// 🖼 Add image collage section
	const addImageSection = (layout: "single" | "double" | "triple") => {
		setSections((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				type: "image",
				layout,
				content: Array(
					layout === "single" ? 1 : layout === "double" ? 2 : 3
				).fill(""),
			},
		]);
		setShowLayoutModal(false);
	};

	// 💬 Add image + quote section
	const addImageQuoteSection = () => {
		setSections((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				type: "image-quote",
				content: { image: "", quote: "" },
			},
		]);
	};

	// ✏️ Update text
	const updateText = (id: string, value: string) => {
		setSections((prev) =>
			prev.map((s) =>
				s.id === id && s.type === "text" ? { ...s, content: value } : s
			)
		);
	};

	// 📸 Handle image upload for collage
	const handleImageUpload = (
		sectionId: string,
		index: number,
		file: File
	) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setSections((prev) =>
				prev.map((s) =>
					s.id === sectionId && s.type === "image"
						? {
								...s,
								content: s.content.map((c, i) =>
									i === index ? (reader.result as string) : c
								),
						  }
						: s
				)
			);
		};
		reader.readAsDataURL(file);
	};

	// 💌 Handle single image + quote upload
	const handleImageQuoteUpload = (sectionId: string, file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setSections((prev) =>
				prev.map((s) =>
					s.id === sectionId && s.type === "image-quote"
						? {
								...s,
								content: {
									...s.content,
									image: reader.result as string,
								},
						  }
						: s
				)
			);
		};
		reader.readAsDataURL(file);
	};

	const updateImageQuoteText = (id: string, value: string) => {
		setSections((prev) =>
			prev.map((s) =>
				s.id === id && s.type === "image-quote"
					? { ...s, content: { ...s.content, quote: value } }
					: s
			)
		);
	};

	const deleteSection = (id: string) => {
		setSections((prev) => prev.filter((s) => s.id !== id));
	};

	const handleFinish = async () => {
		if (!info) return;

		const supabase = createSupabaseClient();

		const { error } = await supabase.from("letters").insert({
			title: info.title,
			color: info.color,
			sections,
			created_at: new Date().toISOString(),
		});

		if (error) throw error;

		toast.success("Letter saved successfully 💌");
		localStorage.removeItem("newLetterInfo");

		router.push("/");
	};

	if (!info)
		return (
			<div className="flex justify-center items-center h-screen text-pink-500">
				Loading...
			</div>
		);

	return (
		<div
			className="min-h-screen p-6 transition-all duration-500 flex flex-col items-center"
			style={{ backgroundColor: info.color }}
		>
			<h1 className="text-pink-600 text-3xl font-semibold text-center mb-6">
				{info.title}
			</h1>

			{/* Sections */}
			<div className="w-full max-w-md space-y-6">
				<AnimatePresence>
					{sections.map((section) => (
						<motion.div
							key={section.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="bg-white/80 p-4 rounded-2xl shadow relative"
						>
							<button
								onClick={() => deleteSection(section.id)}
								className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
							>
								✕
							</button>

							{/* ✏️ Text Section */}
							{section.type === "text" && (
								<textarea
									value={section.content}
									onChange={(e) =>
										updateText(section.id, e.target.value)
									}
									placeholder="Write something lovely 💌"
									className="w-full bg-transparent border-none focus:ring-0 text-pink-700 text-lg leading-relaxed resize-none outline-none min-h-[100px]"
								/>
							)}

							{/* 🖼 Image Section */}
							{section.type === "image" && (
								<div className="mb-6">
									{/* Single layout */}
									{section.layout === "single" && (
										<div className="rounded-xl overflow-hidden shadow-md border-4 border-pink-200">
											{section.content[0] ? (
												<Image
													src={section.content[0]}
													alt="uploaded"
													width={400}
													height={300}
													className="object-cover w-full h-full"
												/>
											) : (
												<label className="cursor-pointer text-pink-500 hover:text-pink-600 text-sm text-center border-2 border-dashed border-pink-300 rounded-lg p-4 w-full block">
													Upload Image
													<input
														type="file"
														accept="image/*"
														className="hidden"
														onChange={(e) =>
															e.target.files &&
															handleImageUpload(
																section.id,
																0,
																e.target
																	.files[0]
															)
														}
													/>
												</label>
											)}
										</div>
									)}

									{/* Double layout */}
									{section.layout === "double" && (
										<div className="grid grid-cols-2 gap-4">
											{section.content.map(
												(img: string, i: number) => (
													<div
														key={i}
														className={`rounded-xl overflow-hidden shadow-md border-4 border-pink-200 ${
															i === 0
																? "rotate-[-3deg]"
																: "rotate-[3deg]"
														}`}
													>
														{img ? (
															<Image
																src={img}
																alt={`collage-${i}`}
																width={200}
																height={200}
																className="object-cover w-full h-full"
															/>
														) : (
															<label className="cursor-pointer text-pink-500 hover:text-pink-600 text-sm text-center border-2 border-dashed border-pink-300 rounded-lg p-4 w-full block">
																Upload Image
																<input
																	type="file"
																	accept="image/*"
																	className="hidden"
																	onChange={(
																		e
																	) =>
																		e.target
																			.files &&
																		handleImageUpload(
																			section.id,
																			i,
																			e
																				.target
																				.files[0]
																		)
																	}
																/>
															</label>
														)}
													</div>
												)
											)}
										</div>
									)}

									{/* Triple layout */}
									{section.layout === "triple" && (
										<div className="grid grid-cols-2 gap-4">
											{section.content.map(
												(img: string, i: number) => (
													<div
														key={i}
														className={`rounded-xl overflow-hidden shadow-md border-4 border-pink-200 ${
															i === 0
																? "rotate-[-3deg]"
																: i === 1
																? "rotate-[2deg]"
																: "rotate-[4deg] col-span-2"
														}`}
													>
														{img ? (
															<Image
																src={img}
																alt={`collage-${i}`}
																width={
																	i === 2
																		? 400
																		: 200
																}
																height={
																	i === 2
																		? 250
																		: 200
																}
																className="object-cover w-full h-full"
															/>
														) : (
															<label className="cursor-pointer text-pink-500 hover:text-pink-600 text-sm text-center border-2 border-dashed border-pink-300 rounded-lg p-4 w-full block">
																Upload Image
																<input
																	type="file"
																	accept="image/*"
																	className="hidden"
																	onChange={(
																		e
																	) =>
																		e.target
																			.files &&
																		handleImageUpload(
																			section.id,
																			i,
																			e
																				.target
																				.files[0]
																		)
																	}
																/>
															</label>
														)}
													</div>
												)
											)}
										</div>
									)}
								</div>
							)}

							{/* 💬 Image Quote Section */}
							{section.type === "image-quote" && (
								<div className="flex flex-col items-center gap-3 mb-8">
									<div className="rounded-xl overflow-hidden shadow-md border-4 border-pink-200 w-full max-w-sm rotate-[-2deg]">
										{section.content.image ? (
											<Image
												src={section.content.image}
												alt="image quote"
												width={400}
												height={300}
												className="object-cover w-full h-full"
											/>
										) : (
											<label className="cursor-pointer text-pink-500 hover:text-pink-600 text-sm text-center border-2 border-dashed border-pink-300 rounded-lg p-4 w-full block">
												Upload Image
												<input
													type="file"
													accept="image/*"
													className="hidden"
													onChange={(e) =>
														e.target.files &&
														handleImageQuoteUpload(
															section.id,
															e.target.files[0]
														)
													}
												/>
											</label>
										)}
									</div>
									<textarea
										value={section.content.quote}
										onChange={(e) =>
											updateImageQuoteText(
												section.id,
												e.target.value
											)
										}
										placeholder="Write your quote here..."
										className="text-center text-pink-700 italic bg-transparent border-none resize-none focus:ring-0 font-[Dancing Script] text-lg"
									/>
								</div>
							)}
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Bottom buttons */}
			<div className="fixed bottom-6 flex gap-3">
				{/* Add Section Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2">
							<Plus className="w-4 h-4" /> Add Section
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-white rounded-xl shadow-lg p-1">
						<DropdownMenuItem
							className="text-pink-600 hover:bg-pink-100 cursor-pointer"
							onClick={addTextSection}
						>
							✏️ Add Text
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-pink-600 hover:bg-pink-100 cursor-pointer"
							onClick={() => setShowLayoutModal(true)}
						>
							🖼 Add Image
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-pink-600 hover:bg-pink-100 cursor-pointer"
							onClick={addImageQuoteSection}
						>
							💬 Add Image Quote
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Finish Button */}
				<Button
					className="bg-green-500 hover:bg-green-600 text-white"
					onClick={handleFinish}
				>
					Finish ✨
				</Button>
			</div>

			{/* Image Layout Modal */}
			<ImageLayoutModal
				showLayoutModal={showLayoutModal}
				setShowLayoutModal={setShowLayoutModal}
				addImageSection={addImageSection}
			/>
		</div>
	);
}
