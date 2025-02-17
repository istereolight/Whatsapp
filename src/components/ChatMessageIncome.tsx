import { useGetAvatarMutation } from "@/app/services/serviceApi";
import { RootState } from "@/app/strore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ChatMessageIncome = ({ senderId, time, senderName, text }) => {
  const [getAvatar] = useGetAvatarMutation();
  const [avatarArr, setAvataArr] = useState();
  const [tempAvatar, setTempAvatar] = useState();
  const apiTokenInstance = useSelector((state: RootState) => state.credentials.apiTokenInstance);

  useEffect(() => {
    const storedAvatars = JSON.parse(localStorage.getItem("avatars")) || [];
    const isAvatarExists = storedAvatars.find((item) => item.chatId === senderId);
    setAvataArr(storedAvatars);
    if (!isAvatarExists) {
      const timeoutId = setTimeout(() => {
        getAvatar({chatId: senderId, apiTokenInstance}).unwrap().then((data) => {
          if (data) {
            setTempAvatar(data.urlAvatar);
            const storedAvatars = JSON.parse(localStorage.getItem("avatars")) || [];
            const isAvatarExists = storedAvatars.some((item) => item.avatarUrl === data.urlAvatar);
            if (!isAvatarExists) {
              const avatarData = { chatId: senderId, avatarUrl: data.urlAvatar };
              storedAvatars.push(avatarData);
              localStorage.setItem("avatars", JSON.stringify(storedAvatars));
            }
          }
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [senderId, getAvatar]);
 
  const avatarUrl = avatarArr?.find((item) => item.chatId === senderId)?.avatarUrl || tempAvatar;

  return (
    <div className="m-1 flex">
      <div className="w-8 h-8 mr-2 mt-2">
        <img className="rounded-2xl" alt="avatar" src={avatarUrl || "/user.png"} />
      </div>
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













