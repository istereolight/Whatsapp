import { useSendTextMessageMutation } from "@/app/services/messageApi";
import { RootState } from "@/app/strore";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  chatId: string
}

export const Input = ({ chatId }: Props) => {
  const [text, setText] = useState('');
  const [sendTextMessage] = useSendTextMessageMutation();
  const apiTokenInstance = useSelector((state: RootState) => state.credentials.apiTokenInstance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sendTextMessage({
        chatId,
	      message: text,
        apiTokenInstance
      });
      setText('');
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
        className="w-full h-8 bg-[#293538] rounded-sm p-2 mt-[1px] focus:outline-none"
        type="text"
        placeholder="type your message here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}
