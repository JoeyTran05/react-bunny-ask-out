"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundSelector from "@/components/BackgroundSelector";

export default function NewLetterPage() {
	const router = useRouter();
	const [open, setOpen] = useState(true);

	const handleSelect = (data: { title: string; color: string }) => {
		// Save data to localStorage
		localStorage.setItem("newLetterInfo", JSON.stringify(data));

		setOpen(false);

		// Navigate to editor page
		setTimeout(() => {
			router.push("/taothumoi/editor");
		}, 300);
	};

	const onClose = () => {
		setOpen(false);
		setTimeout(() => {
			router.push("/");
		}, 300);
	};

	return (
		<div className="flex items-center justify-center h-screen bg-pink-50">
			<BackgroundSelector
				open={open}
				onClose={onClose}
				onSelect={handleSelect}
			/>
		</div>
	);
}
