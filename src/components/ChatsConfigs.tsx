import { NewChatIcon } from "./ui/newChat"


export const ChatsConfigs = ({ setIsModalNewChatOpen }) => {

  const handleClick = () => {
    setIsModalNewChatOpen(true);
  }

  return (
    <div className='flex justify-between bg-primary-400 h-[50px] px-5 pt-1'>
      <h2 className='p-3 w-[100px] text-white font-bold text-lg'>Chats</h2>
      <button className="h-12" onClick={handleClick}>
        <NewChatIcon fillColor={'white'} />
      </button>
  </div>
  )
}

