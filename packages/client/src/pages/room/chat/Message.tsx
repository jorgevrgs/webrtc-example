interface MessageProps {
  author: string;
  content: string;
  sameAuthor: boolean;
  createdByMe: boolean;
}

function Message({ author, content, sameAuthor, createdByMe }: MessageProps) {
  const alignClass = createdByMe ? 'message_align_right' : 'message_align_left';
  const authoText = createdByMe ? 'You' : author;
  const contentAdditionalStyles = createdByMe
    ? 'message_right_styles'
    : 'message_left_styles';

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authoText}</p>}
      <p className={`message_content ${contentAdditionalStyles}`}>{content}</p>
    </div>
  );
}

export default Message;
