import { addChatHistory, chatName, addChatId } from "@/app/services/apiSlice";
import { useGetChatHistoryMutation } from "@/app/services/messageApi";
import { useGetAvatarMutation, useGetContactDataMutation, useGetGroupDataMutation } from "@/app/services/serviceApi";
import { RootState } from "@/app/strore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


interface ICard {
  chatId: string,
  lastMessage?: string,
}

export const Card = ({ 
  chatId = '',
  lastMessage = '',
}: ICard) => {
  const [shouldRender, setShouldRender] = useState(false);
  const isImage = true;
  const [getContactData, { data: contactData }] = useGetContactDataMutation();
  const [getGroupData] = useGetGroupDataMutation();
  const [getAvatar, {data: avatarData}] = useGetAvatarMutation();
  const [getChatHistory, {data: chatHistoryData }] = useGetChatHistoryMutation();
  const dispatch = useDispatch();
  const textMessages = [];
  const apiTokenInstance = useSelector((state: RootState) => state.credentials.apiTokenInstance);

  const storedAvatar = () => {
    const storedAvatars = JSON.parse(localStorage.getItem("avatars")) || [];
    return storedAvatars.find((item) => item.chatId === chatId)?.avatarUrl;
  }

  const storedChatData = () => {
    const storedAllChatsData = JSON.parse(localStorage.getItem("chatNames")) || [];
    return storedAllChatsData.find((item) => item.chatId === chatId)?.chatName;
  }

  const storeNewAvatar = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await getAvatar({chatId, apiTokenInstance}).unwrap().then((data) => {
      const storedAvatars = JSON.parse(localStorage.getItem("avatars")) || [];
      if (!storedAvatar()) {
        const newAvatarData = { chatId: chatId, avatarUrl: data?.urlAvatar || ''};
        storedAvatars.push(newAvatarData);
        localStorage.setItem("avatars", JSON.stringify(storedAvatars));
      }
    })
  }

  const storeNewChatName = async () => {
    await getContactData({chatId, apiTokenInstance}).unwrap().then((data) => {
      const storedAllChatsData = JSON.parse(localStorage.getItem("chatNames")) || [];
      if (!storedChatData()) {
        const newChatNameData = { chatId: chatId, chatName: data?.name || data?.chatId, };
        storedAllChatsData.push(newChatNameData);
        localStorage.setItem("chatNames", JSON.stringify(storedAllChatsData));
      }
    })
  }

  const storeNewGroupChatName = async () => {
    await getGroupData({groupId: chatId, apiTokenInstance}).unwrap().then((data) => {
      const storedAllChatsData = JSON.parse(localStorage.getItem("chatNames")) || [];
      if (!storedChatData()) {
        const newChatNameData = { chatId: chatId, chatName: data?.subject};
        storedAllChatsData.push(newChatNameData);
        localStorage.setItem("chatNames", JSON.stringify(storedAllChatsData));
      }
    })
  }

  useEffect(() => {
    if(chatId.length === 16 ) { // if this is NOT a group chat
      if (!storedChatData()) {
        storeNewChatName();
      };
      if (!storedAvatar()) {
        storeNewAvatar();
      }; 
    } else {
      if (!storedAvatar()) {
        storeNewAvatar();
      }; 
      if (!storedChatData()) {
        storeNewGroupChatName();
      };
    }
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 500);
    return () => clearTimeout(timer);
  },[])

  const handleClick = async () => {
    try {
      await getChatHistory({
        chatId, 
        apiTokenInstance}).then((chatHistory) => {
          console.log(chatHistory.data);
          let messages;
          messages = chatHistory.data.filter((message) => (
            message.typeMessage === 'textMessage' || 
            message.typeMessage === 'extendedTextMessage' ||
            message.typeMessage === 'quotedMessage'
          ))
          dispatch(addChatHistory(messages));
        });
      dispatch(chatName(storedChatData()));
      dispatch(addChatId(chatId));
    } catch (err) {
      console.log(err)
    }
  };

  textMessages.sort((a, b) => b.message.timestamp - a.message.timestamp);
  
  dispatch(addChatHistory(textMessages));

  if (!shouldRender) {
    return null;
  }

  return (
    <div onClick={() => handleClick()} className="flex w-full h-20 p-2 text-gray-300 bg-primary-400 cursor-pointer" >
      {
        !isImage 
          ? <div className="w-14 h-12 mr-3 bg-gray-300 rounded-3xl"></div>
          : <img src={storedAvatar() || contactData?.avatar || avatarData?.urlAvatar || '/user.png'} className="w-14 h-12 mr-3 bg-gray-300 rounded-3xl" />
      }
      <div className=" w-full border-b-[1px] border-gray-700 overflow-hidden">
        <div className="w-full text-lg">
          <span>{storedChatData()}</span>
        </div>
        <div className="w-[300px] h-[20px] text-sm overflow-hidden">
          <span>{lastMessage}</span>
        </div>
      </div>
    </div>

  )
}

 



