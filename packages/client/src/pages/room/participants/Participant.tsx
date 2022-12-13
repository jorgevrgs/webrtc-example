import { pick } from 'lodash-es';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setActiveChat } from '../../../store';

interface ParticipantProps {
  identity: string;
  lastItem: boolean;
}

export default function Participant({ identity, lastItem }: ParticipantProps) {
  const { participants } = useAppSelector((state) =>
    pick(state.room, ['participants', 'identity'])
  );

  const { socketId } = useAppSelector((state) =>
    pick(state.chat, ['socketId'])
  );

  const dispatch = useAppDispatch();

  const handleParticipantClick = (identity: string) => {
    const participant = participants.find(
      (participant) => participant.identity === identity
    );

    dispatch(
      setActiveChat(
        participant && participant.socketId !== socketId ? participant : null
      )
    );
  };

  return (
    <>
      <p
        className="participants_paragraph"
        onClick={() => handleParticipantClick(identity)}
      >
        {identity}
      </p>

      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
}
