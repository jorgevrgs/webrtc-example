import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setIsRoomHost } from '../../store/actions';
import './JoinRoomPage.css';
import JoinRoomTItle from './JoinRoomTItle';

function JoinRoomPage({ setIsRoomHostAction, isRoomHost }) {
  const { search } = useLocation();

  useEffect(() => {
    const isHost = new URLSearchParams(search).get('host');

    if (isHost) {
      setIsRoomHostAction(true);
    }
  }, [search, setIsRoomHostAction]);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTItle isRoomHost={isRoomHost} />
      </div>
    </div>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomPage);
