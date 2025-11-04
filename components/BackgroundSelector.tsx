"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundSelectorProps {
	open: boolean;
	onClose: () => void;
	onSelect: (data: { title: string; color: string }) => void;
}

export default function BackgroundSelector({
	open,
	onClose,
	onSelect,
}: BackgroundSelectorProps) {
	const [title, setTitle] = useState("");
	const [bgColor, setBgColor] = useState("#ffe4e6");

	const presetColors = [
		"#ffe4e6",
		"#fce7f3",
		"#fef3c7",
		"#dcfce7",
		"#e0f2fe",
	];

	const handleConfirm = () => {
		if (!title.trim()) return alert("Please enter a title 💌");
		onSelect({ title, color: bgColor });
	};

	return (
		<AnimatePresence>
			{open && (
				<Dialog open={open} onOpenChange={onClose}>
					<DialogContent className="bg-white rounded-2xl p-6 max-w-md shadow-xl">
						<DialogHeader>
							<DialogTitle className="text-pink-600 text-xl text-center font-semibold">
								Create New Letter 💌
							</DialogTitle>
						</DialogHeader>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col gap-4 mt-4"
						>
							{/* Title Input */}
							<div>
								<p className="text-sm text-gray-500 mb-2">
									Letter Title
								</p>
								<Input
									placeholder="e.g. 3 tháng yêu nhau ✨"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>

							{/* Background Color Picker */}
							<div>
								<p className="text-sm text-gray-500 mb-2">
									Background Color
								</p>
								<div className="flex gap-2">
									{presetColors.map((color) => (
										<button
											key={color}
											className={cn(
												"w-8 h-8 rounded-full border-2 hover:scale-110 transition",
												bgColor === color
													? "border-pink-500"
													: "border-transparent"
											)}
											style={{ backgroundColor: color }}
											onClick={() => setBgColor(color)}
										/>
									))}
									<Input
										type="color"
										value={bgColor}
										onChange={(e) =>
											setBgColor(e.target.value)
										}
										className="w-10 h-10 p-0 border-none cursor-pointer"
									/>
								</div>
							</div>

							{/* Preview */}
							<div
								className="rounded-xl border border-pink-100 overflow-hidden mt-2"
								style={{
									height: "120px",
									backgroundColor: bgColor,
								}}
							></div>

							{/* Buttons */}
							<div className="flex justify-end gap-2 mt-4">
								<Button variant="outline" onClick={onClose}>
									Cancel
								</Button>
								<Button
									onClick={handleConfirm}
									className="bg-pink-500 hover:bg-pink-600 text-white"
								>
									Next
								</Button>
							</div>
						</motion.div>
					</DialogContent>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
