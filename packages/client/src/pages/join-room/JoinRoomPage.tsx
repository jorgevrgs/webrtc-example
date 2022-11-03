import { pick } from 'lodash-es';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsRoomHost } from '../../store';
import JoinRoomContent from './JoinRoomContent';
import './JoinRoomPage.css';
import JoinRoomTItle from './JoinRoomTItle';

export default function JoinRoomPage() {
  const { search } = useLocation();

  // Store
  const dispatch = useAppDispatch();
  const { isRoomHost } = useAppSelector((state) =>
    pick(state.room, ['isRoomHost'])
  );

  useEffect(() => {
    const isHost = new URLSearchParams(search).get('host');

    dispatch(setIsRoomHost(Boolean(isHost)));
  }, [search, setIsRoomHost]);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTItle isRoomHost={isRoomHost} />

        <JoinRoomContent />
      </div>
    </div>
  );
}
