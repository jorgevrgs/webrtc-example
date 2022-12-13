import { useEffect, useRef } from 'react';
import Message from './Message';

interface MessagesProps {
  messages: {
    content: string;
    isAuthor: boolean;
  }[];
}

function Messages({ messages }: MessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="direct_messages_container">
      {messages.map((message, index) => (
        <Message
          isAuthor={message.isAuthor}
          content={message.content}
          key={index}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
}

export default Messages;
