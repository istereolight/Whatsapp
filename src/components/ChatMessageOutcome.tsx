
export const ChatMessageOutcome = ({ senderId, time, senderName, text }) => {
  return (
    <div className="m-1 flex flex-row-reverse">
      <div className="relative max-w-[50%] p-1 flex flex-col rounded-xl bg-slate-400">
        <span className="font-bold">{senderName}</span>
        <div className="text-wrap break-words">{text}</div>
        <div className="flex justify-end mx-1">
          <span className="right-2 bottom-[-10px] font-semibold text-[8px]">{time}</span>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};













