export class UserDto {
  id = '';
  identity = '';
  socketId = '';
  roomId = '';

  constructor(data) {
    Object.assign(this, data);
  }
}
