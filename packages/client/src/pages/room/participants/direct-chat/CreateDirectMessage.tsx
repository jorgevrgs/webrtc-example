import { ChangeEvent, KeyboardEvent, useState } from 'react';
import sendMessageButton from '../../../../assets/icons/sendMessageButton.svg';
import { sendChatMessage } from '../../../../utils/socket';

interface CreateDirectMessageProps {
  identity: string;
}

function CreateDirectMessage({ identity }: CreateDirectMessageProps) {
  const [message, setMessage] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    sendChatMessage(message);
    setMessage('');
  };

  const handleKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="new_message_container new_message_direct_border">
      <input
        className="new_message_input"
        placeholder="Type a message..."
        value={message}
        onChange={handleTextChange}
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        onClick={sendMessage}
        src={sendMessageButton}
        alt="Send message"
      />
    </div>
  );
}

export default CreateDirectMessage;
