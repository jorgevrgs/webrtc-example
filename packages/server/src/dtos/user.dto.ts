import { v4 as uuidv4 } from 'uuid';

export class UserDto {
  id = '';

  identity = '';

  socketId = '';

  roomId = '';

  onlyAudio = false;

  constructor(data: Partial<UserDto>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = uuidv4();
    }

    if (!data.roomId) {
      this.roomId = uuidv4();
    }
  }
}
