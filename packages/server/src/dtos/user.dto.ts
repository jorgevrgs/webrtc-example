export class UserDto {
  id = '';

  identity = '';

  socketId = '';

  roomId = '';

  constructor(data: Partial<UserDto>) {
    Object.assign(this, data);
  }
}
