"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

/**
 * Nhạc nền tự phát khi vô trang.
 * Trình duyệt chặn nhạc có tiếng nếu chưa ai chạm màn hình, nên:
 *  1. thử phát bình thường trước
 *  2. nếu bị chặn thì phát ở chế độ tắt tiếng (cái này dc phép),
 *     rồi mở tiếng lên ngay khi em bé chạm / lướt / bấm phím lần đầu
 *  3. vẫn có nút góc dưới để bật tắt tay
 */
const MusicPlayer = ({ src }: { src: string }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [playing, setPlaying] = useState(false);
	const [needsTouch, setNeedsTouch] = useState(false);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0.6;

		audio
			.play()
			.then(() => {
				setPlaying(true);
				setNeedsTouch(false);
			})
			.catch(() => {
				// bị chặn -> phát tắt tiếng, chờ em bé chạm màn hình
				audio.muted = true;
				audio
					.play()
					.then(() => {
						setPlaying(true);
						setNeedsTouch(true);
					})
					.catch(() => setNeedsTouch(true));
			});

		const wakeUp = () => {
			audio.muted = false;
			audio
				.play()
				.then(() => {
					setPlaying(true);
					setNeedsTouch(false);
				})
				.catch(() => {});
		};

		const events = ["pointerdown", "keydown", "touchstart", "scroll"];
		events.forEach((event) =>
			window.addEventListener(event, wakeUp, {
				once: true,
				passive: true,
			}),
		);
		return () =>
			events.forEach((event) =>
				window.removeEventListener(event, wakeUp),
			);
	}, []);

	const toggle = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) {
			audio.muted = false;
			audio
				.play()
				.then(() => {
					setPlaying(true);
					setNeedsTouch(false);
				})
				.catch(() => setPlaying(false));
		} else {
			audio.pause();
			setPlaying(false);
		}
	};

	return (
		<>
			<audio ref={audioRef} src={src} loop autoPlay preload="auto" />

			<div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
				{needsTouch && (
					<span className="animate-pulse rounded-full bg-white/90 px-3 py-1 text-xs text-pink-600 shadow">
						Chạm màn hình để nghe nhạc 🎵
					</span>
				)}
				<button
					type="button"
					onClick={toggle}
					aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
					className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg transition hover:bg-pink-600"
				>
					{playing && !needsTouch ? (
						<Pause className="h-5 w-5" />
					) : (
						<Music className="h-5 w-5" />
					)}
				</button>
			</div>
		</>
	);
};

export default MusicPlayer;
