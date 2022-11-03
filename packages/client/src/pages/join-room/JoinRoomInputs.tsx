import { ChangeEvent } from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, onChangeHandler }: InputProps) => {
  return (
    <input
      className="join_room_input"
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

interface JoinRoomInputsProps {
  roomIdValue: string;
  setRoomIdValue: (roomId: string) => void;
  userNameValue: string;
  setUserNameValue: (userName: string) => void;
  isRoomHost: boolean;
}

export default function JoinRoomInputs({
  roomIdValue,
  setRoomIdValue,
  userNameValue,
  setUserNameValue,
  isRoomHost,
}: JoinRoomInputsProps) {
  const handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomIdValue(e.target.value);
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
