import { useEffect, useState } from 'react';
import { Card } from './Card'

export const DelayCard = ({chatsWithLastMessages}) => {
  const [renderedChats, setRenderedChats] = useState([]);

  useEffect(() => {
    const renderCardsSequentially = async () => {
      for (let i = 0; i < chatsWithLastMessages.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setRenderedChats((prev) => [...prev, chatsWithLastMessages[i]]);
            resolve();
          }, 300);
        });
      }
    };
    renderCardsSequentially();
  }, [chatsWithLastMessages]);

  return (
    <div className='absolute top-[130px] h-[870px] w-[384px] overflow-scroll'>
      {renderedChats.length > 0 ? renderedChats.map((item, index) => <Card key={index} chatId={item.chatId} lastMessage={item.lastMessage}/>): null}
    </div>
  )
}
