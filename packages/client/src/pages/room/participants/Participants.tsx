import { pick } from 'lodash-es';
import { useAppSelector } from '../../../hooks';
import Participant from './Participant';

export default function Participants() {
  const { participants } = useAppSelector((state) =>
    pick(state.room, ['participants'])
  );

  return (
    <div className="participants_container">
      {participants.map(({ identity }, index) => (
        <Participant
          identity={identity}
          key={index}
          lastItem={participants.length === index + 1}
        />
      ))}
    </div>
  );
}
