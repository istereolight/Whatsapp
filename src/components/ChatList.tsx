import { useLazyGetLastIncomingMessagesQuery, useLazyGetLastOutgoingMessagesQuery } from "@/app/services/messageApi";
import { DelayCard } from "./DelayCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/strore"; 

type Message = {
  chatId: string;
  timestamp: number;
  typeMessage: 'textMessage' | 'extendedTextMessage' | 'quotedMessage' | 'imageMessage' | 'reactionMessage' | 'stickerMessage';
  textMessage?: string;
  extendedTextMessageData?: { text: string };
};

type IChatsWithMessages = {
  chatId: string;
  lastMessage: string;
}[];

export const ChatList = () => {
  const [getIncomingMessages, { data: incomingMessages }] = useLazyGetLastIncomingMessagesQuery();
  const [getOutgoingMessages, { data: outgoingMessages }] = useLazyGetLastOutgoingMessagesQuery();
  const apiTokenInstance = useSelector((state: RootState) => state.credentials.apiTokenInstance);
  const newChats = useSelector((state: RootState) => state.newChats);
  const [chatsWithLastMessages, setChatsWithLastMessages] = useState<IChatsWithMessages>([]);

  useEffect(() => {
    getIncomingMessages({ apiTokenInstance });
    getOutgoingMessages({ apiTokenInstance });
  }, [apiTokenInstance, getIncomingMessages, getOutgoingMessages]);

  useEffect(() => {
    if (incomingMessages && outgoingMessages) {
      let newChatsWithLastMessages: IChatsWithMessages = [];

      const set = new Set<string>();
      incomingMessages.forEach((message: Message) => set.add(message.chatId));
      outgoingMessages.forEach((message: Message) => set.add(message.chatId));

      set.forEach((chatId) => {
        const filteredIncoming = incomingMessages.filter((message: Message) => message.chatId === chatId);
        const filteredOutgoing = outgoingMessages.filter((message: Message) => message.chatId === chatId);
        const filteredAllMessages = filteredIncoming.concat(filteredOutgoing);

        let messageTime = 0;
        let lastMessage = '';

        filteredAllMessages.forEach((message) => {
          if (messageTime === 0 || message.timestamp < messageTime) {
            messageTime = message.timestamp;
          }
        });

        const lastMessageObject = filteredAllMessages.find((message) => message.timestamp === messageTime);

        if (lastMessageObject) {
          switch (lastMessageObject.typeMessage) {
            case 'textMessage':
            case 'extendedTextMessage':
              lastMessage = lastMessageObject.textMessage || lastMessageObject.extendedTextMessageData?.text || '';
              break;
            case 'quotedMessage':
              lastMessage = lastMessageObject.extendedTextMessage.text;
              console.log('lastMessage: ' + lastMessage);
              break;
            case 'imageMessage':
              lastMessage = 'photo';
              break;
            case 'reactionMessage':
              lastMessage = lastMessageObject.extendedTextMessageData?.text || '';
              break;
            case 'stickerMessage':
              lastMessage = 'sticker';
              break;
            default:
              lastMessage = '';
          }

          newChatsWithLastMessages.push({
            chatId,
            lastMessage,
          });
        }
      });

      newChatsWithLastMessages.reverse();
      newChats.forEach((chat) => {
        newChatsWithLastMessages.push({
          chatId: chat.chatId,
          lastMessage: '',
        });
      });
      newChatsWithLastMessages.reverse();

      setChatsWithLastMessages(newChatsWithLastMessages);
    }
  }, [incomingMessages, outgoingMessages, newChats]);

  return (
    <>
      <DelayCard chatsWithLastMessages={chatsWithLastMessages} />
    </>
  );
};
