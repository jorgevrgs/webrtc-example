import { useState } from 'react';
import SendMessageButton from '../../../assets/icons/sendMessageButton.svg';
import { sendChatMessage } from '../../../utils/socket';

function CreateMessage() {
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.length > 0) {
      // Send message to server
      sendChatMessage(message);

      // After
      setMessage('');
    }
  };

  return (
    <div className="new_message_container">
      <input
        type="text"
        className="new_message_input"
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
        onKeyDown={handleKeyPressed}
      />

      <img
        src={SendMessageButton}
        alt="Send"
        className="new_message_button"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default CreateMessage;
