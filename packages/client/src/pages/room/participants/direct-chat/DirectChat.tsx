import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks';
import ConversationNotChosen from './ConversationNotChoosen';
import CreateDirectMessage from './CreateDirectMessage';
import DirectChatHeader from './DirectChatHeader';
import Messages from './Messages';

function DirectChat() {
  const { activeChat, history } = useAppSelector((state) => state.chat);
  const [messages, setMessages] = useState([]);

  useEffect(() => {}, [activeChat, history]);

  return (
    <div className="direct_chat_container">
      <DirectChatHeader identity={activeChat?.identity} />

      <Messages messages={messages} />

      {activeChat && <CreateDirectMessage identity={activeChat.identity} />}

      {!activeChat && <ConversationNotChosen />}
    </div>
  );
}

export default DirectChat;
