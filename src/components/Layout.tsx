import { useState } from 'react'
import { ChatList } from './ChatList'
import { ChatMain } from './ChatMain'
import { ChatsConfigs } from './ChatsConfigs'
import { ModalStartUp } from './ModalStartUp'
import { ModalNewChat } from './ModalNewChat'
import { ModalIncorrect } from './ModalIncorrect'


export const Layout = () => {
  const [isModalStartUpOpen, setIsModalStartUpOpen] = useState(true);
  const [isModalNewChatOpen, setIsModalNewChatOpen] = useState(false);
  const [isCorrectAccount, setIsCorrectAccount] = useState(true);

  return (
    <>
      <div className='relative flex items-center my-1'>
        {isModalNewChatOpen && <ModalNewChat setIsModalNewChatOpen={setIsModalNewChatOpen}/>}
        {isModalStartUpOpen && <ModalStartUp setIsModalStartUpOpen={setIsModalStartUpOpen} setIsCorrectAccount={setIsCorrectAccount}/>}
        <div className={!isModalNewChatOpen ? 'w-[1280px] h-[1000px] flex pl-5 pt-2' : 'w-[1280px] h-[1000px] flex pl-5 pt-2 opacity-20 pointer-events-none'}>
          <div className='relative w-[385px] h-auto bg-primary-200'>
          {!isModalStartUpOpen && (
            isCorrectAccount 
              ? <ChatsConfigs setIsModalNewChatOpen={setIsModalNewChatOpen} /> 
              : <ModalIncorrect setIsModalStartUpOpen={setIsModalStartUpOpen} />
          )}
            {!isModalStartUpOpen && (
              isCorrectAccount 
              ? <ChatList />
              : null
            )}
          </div>
          <div className='relative w-[850px] h-auto bg-[url(/chat-bg.jpg)]'>
            {!isModalStartUpOpen && (
              isCorrectAccount 
              ? <ChatMain />
              : null
            )}
          </div>
        </div>
      </div>
    </>

  )
}