import Lottie from "lottie-react";

const BunnyPlayer = ({
	animationData,
	className,
}: {
	animationData: unknown;
	className?: string;
}) => {
	return (
		<Lottie
			animationData={animationData}
			loop
			autoplay
			className={className}
		/>
	);
};

export default BunnyPlayer;
