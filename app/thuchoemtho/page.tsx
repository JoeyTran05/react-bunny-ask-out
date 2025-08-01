"use client";

import BunnyPlayer from "@/components/BunnyPlayer";
import bunny_ears from "@/public/bunny_ears.json";
import bunny_in_hat from "@/public/bunny_in_hat.json";
import bunny_holding_carrot from "@/public/bunny_holding_carrot.json";
import TouchBunny from "@/components/TouchBunny";

const ThuChoEmTho = () => {
	return (
		<main className="min-h-screen bg-blue-500 relative overflow-hidden bg-[url('/bg.png')] bg-repeat-x bg-bottom">
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full px-6 max-w-md mx-auto z-10">
					<TouchBunny animationData={bunny_holding_carrot} />
					<TouchBunny animationData={bunny_in_hat} />
					<div className=" w-full flex justify-center">
						<div className="mb-8 w-40 h-40">
							<BunnyPlayer animationData={bunny_ears} />
						</div>
					</div>
					<div className="bg-pink-300 p-4 rounded-2xl">
						<span className="text-center p-6 text-xl text-pink-700">
							em bé ơii, hôm nay là girlfriend’s day nên anh có
							món quà nho nhỏ muốn tặng cho em, mặc dù em chưa
							phải là bạn gái anh ={")))"} nhưng mà bó hoa này là
							thay cho những lời yêu thương anh muốn nói và những
							sự trân trọng anh dành cho em, và anh cũng muốn bạn
							gái tương lai của anh hôm nay cũng dc nhận hoa như
							bao người khác hehe, nói chung là anh muốn em luôn
							luôn dc hạnh phúc và vui vẻ để còn sớm làm bạn gái
							anh ={"))))"}
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ThuChoEmTho;
