import { ChatMessageIncome } from './ChatMessageIncome';
import { ChatMessageOutcome } from './ChatMessageOutcome';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from './Input';
import { RootState } from '../app/strore';
import { useGetChatHistoryMutation } from '@/app/services/messageApi';
import { useEffect } from 'react';
import { addChatHistory } from '@/app/services/apiSlice';


export const ChatMain = ({}) => {
  const messages = useSelector((state: RootState) => state.addChatHistory.message);
  const chatName = useSelector((state: RootState) => state.addChatHistory.chatName);
  const chatId = useSelector((state: RootState) => state.addChatHistory.chatId);
  const apiTokenInstance = useSelector((state: RootState) => state.credentials.apiTokenInstance);
  const [getChatHistory] = useGetChatHistoryMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatId) {
      const fetchChatHistory = async () => {
        await getChatHistory({ chatId, apiTokenInstance }).unwrap().then((messages) => {
          dispatch(addChatHistory(messages));
        });
      };
      const initialTimeout = setTimeout(() => {
        fetchChatHistory();
        const interval = setInterval(fetchChatHistory, 10000);
        return () => clearInterval(interval);
      }, 10000);
      return () => clearTimeout(initialTimeout);
    }
  }, [chatId, getChatHistory, apiTokenInstance, dispatch]);

  const getTime = (timeStamp: number) => {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return hours + ':' + minutes;
  };
  
  return (
    <>
      <div className='z-[2] pl-5 pt-2 w-full bg-primary-100 h-[50px] text-white'>
        <span className='font-bold ml-5'>{chatName}</span>
      </div>
      <div className='z-[1] flex flex-col-reverse h-[90%] overflow-scroll'>
      <div className='flex p-1 flex-col-reverse overflow-scroll'>
        {messages && messages.length > 0 && messages.map((message) => (
          message.type === 'incoming' 
          ? <ChatMessageIncome key={message.idMessage} text={message.textMessage || message.extendedTextMessage?.text} time={getTime(message.timestamp)} senderName={message.senderName} senderId={message.senderId}/>
          : <ChatMessageOutcome key={message.idMessage} text={message.textMessage || message?.extendedTextMessage?.text} time={getTime(message.timestamp)} senderName={message.senderName} senderId={message.senderId} />
        ))}
      </div>
      </div>
      <div className='absolute bottom-0 z-[0] px-2 pt-2 w-full bg-primary-100 h-[50px] text-white'>
        {chatId && <Input chatId={chatId}/>}
      </div>
    </>
  )
}
