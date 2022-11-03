interface ParticipantProps {
  identity: string;
  lastItem: boolean;
}

export default function Participant({ identity, lastItem }: ParticipantProps) {
  return (
    <>
      <p className="participants_paragraph">{identity}</p>

      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
}
