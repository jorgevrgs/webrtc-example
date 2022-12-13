interface DirectChatHeaderProps {
  identity?: string;
}

function DirectChatHeader({ identity = '' }: DirectChatHeaderProps) {
  return (
    <div className="direct_chat_header">
      <p className="direct_chat_header_paragraph">{identity}</p>
    </div>
  );
}

export default DirectChatHeader;
