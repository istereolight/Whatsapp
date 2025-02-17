import { useState } from "react"
import { CrossIcon } from "./ui/CrossIcon"
import { useDispatch, useSelector } from "react-redux";
import { newChats } from "@/app/services/newChatSlice";
import { addChatHistory, addChatId, chatName } from "@/app/services/apiSlice";
import { RootState } from "@/app/strore";
import { useGetChatHistoryMutation } from "@/app/services/messageApi";


export const ModalNewChat = ({ setIsModalNewChatOpen }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiTokenInstance = useSelector((state: RootState) => state.credentials.apiTokenInstance);
  const [getChatHistory] = useGetChatHistoryMutation();
  const dispatch = useDispatch();

  const handleCloseButton = () => {
    setIsModalNewChatOpen(false)
  }

  const handleStartChat = async () => {
    if (/^\d*$/.test(phoneNumber) && phoneNumber.length === 11) {
      const chatId = `${phoneNumber}@c.us`;
      try {
        await getChatHistory({chatId, apiTokenInstance}).unwrap().then((chatHistory) => {
          dispatch(addChatHistory(chatHistory));
        });
      } catch (err) {
        console.log(err);
      }
      dispatch(newChats({ 
        chatId, 
        lastMessage: ''
      }));
      dispatch(addChatId(chatId));
      dispatch(chatName(chatId));
      setErrorMessage('');
      setIsModalNewChatOpen(false);
    } else {
      setErrorMessage('can only contain 11 digits');
    }
    
  }

  return (
    <div className='absolute z-10 top-[150px] left-[400px] w-[450px] h-[250px] bg-slate-600 rounded-sm'>
      <div className="flex justify-end">
        <button onClick={handleCloseButton} className="h-5 p-2">
          <CrossIcon />
        </button>
      </div>
      <div className="px-2">
        {errorMessage 
          ? <h3 className="mx-2 my-2 font-semibold text-red-400">{errorMessage}</h3>
          : <h3 className="mx-2 my-2 font-semibold text-slate-300">Enter a phone number in format 7xxxxxxxxxx</h3>
        }
        <input 
          className="w-full h-8 my-1 bg-[#293538] rounded-sm p-2 mt-[1px] focus:outline-none text-slate-300"
          type="text"
          placeholder="Start a new chat"
          value={phoneNumber}
          onChange={(e) => {setPhoneNumber(e.target.value)}}
        />
      </div>
      <div className="w-full flex justify-end">
        <button onClick={handleStartChat} className="my-5 mr-5 w-[120px] border-2 border-gray-500 rounded-lg px-4 py-2 hover:bg-gray-500">
          Start chat
        </button>
      </div>
    </div>
  )
}
