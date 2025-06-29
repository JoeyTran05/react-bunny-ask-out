const MessageCard = ({ message }: { message: string }) => {
	return (
		<div className="bg-white shadow-md rounded-2xl px-4 py-3 mt-4 text-center text-lg">
			{message}
		</div>
	);
};

export default MessageCard;
