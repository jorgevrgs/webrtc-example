import { pick } from 'lodash-es';
import { useAppSelector } from '../../../hooks';
import ChatLabel from './ChatLabel';
import CreateMessage from './CreateMessage';
import Messages from './Messages';

export default function ChatSection() {
  const { messages } = useAppSelector((state) =>
    pick(state.room, ['messages'])
  );

  return (
    <div className="chat_section_container">
      <ChatLabel />

      <Messages messages={messages} />

      <CreateMessage />
    </div>
  );
}
