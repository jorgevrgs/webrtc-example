import React from 'react';

const Input = ({ placeholder, value, onChangeHandler }) => {
  return (
    <input
      className="join_room_input"
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default function JoinRoomInputs({
  roomIdValue,
  setRoomIdValue,
  userNameValue,
  setUserNameValue,
  isRoomHost,
}) {
  const handleRoomIdChange = (e) => {
    setRoomIdValue(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserNameValue(e.target.value);
  };

  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <Input
          placeholder="Enter meeting ID"
          value={roomIdValue}
          onChangeHandler={handleRoomIdChange}
        />
      )}

      <Input
        placeholder="Enter your name"
        value={userNameValue}
        onChangeHandler={handleUserNameChange}
      />
    </div>
  );
}
