import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageLayoutModalProps {
	showLayoutModal: boolean;
	setShowLayoutModal: (setShowLayoutModal: boolean) => void;
	addImageSection: (layout: "single" | "double" | "triple") => void;
}

const ImageLayoutModal = ({
	showLayoutModal,
	setShowLayoutModal,
	addImageSection,
}: ImageLayoutModalProps) => {
	return (
		<Dialog open={showLayoutModal} onOpenChange={setShowLayoutModal}>
			<DialogContent className="bg-white rounded-2xl p-6 max-w-sm">
				<DialogHeader>
					<DialogTitle className="text-pink-600 text-center">
						Choose Image Layout 💕
					</DialogTitle>
				</DialogHeader>

				<div className="grid gap-3 mt-4">
					<Button
						className="bg-pink-400 hover:bg-pink-500 text-white"
						onClick={() => addImageSection("single")}
					>
						Single Photo 📸
					</Button>
					<Button
						className="bg-pink-400 hover:bg-pink-500 text-white"
						onClick={() => addImageSection("double")}
					>
						2-Image Collage 🫶
					</Button>
					<Button
						className="bg-pink-400 hover:bg-pink-500 text-white"
						onClick={() => addImageSection("triple")}
					>
						3-Image Collage 💞
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ImageLayoutModal;
