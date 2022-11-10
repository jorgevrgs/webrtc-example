import { ChangeEvent, createRef, forwardRef, useEffect } from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, onChangeHandler }, ref) => {
    return (
      <input
        className="join_room_input"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        ref={ref}
      />
    );
  }
);

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
  const nameRef = createRef<HTMLInputElement>();
  const meetingRef = createRef<HTMLInputElement>();

  const handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomIdValue(e.target.value);
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(e.target.value);
  };

  useEffect(() => {
    if (isRoomHost) {
      nameRef.current?.focus();
    } else {
      meetingRef.current?.focus();
    }
  }, []);

  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <Input
          placeholder="Enter meeting ID"
          value={roomIdValue}
          onChangeHandler={handleRoomIdChange}
          ref={meetingRef}
        />
      )}

      <Input
        placeholder="Enter your name"
        value={userNameValue}
        onChangeHandler={handleUserNameChange}
        ref={nameRef}
      />
    </div>
  );
}
