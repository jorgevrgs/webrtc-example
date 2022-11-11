import type { Message as MessageType } from '../../../store';
import Message from './Message';

interface MessagesProps {
  messages: MessageType[];
}

function Messages({ messages }: MessagesProps) {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && messages[index - 1].identity === message.identity;

        return (
          <Message
            author={message.identity}
            content={message.content}
            createdByMe={message.createdByMe}
            sameAuthor={sameAuthor}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default Messages;
