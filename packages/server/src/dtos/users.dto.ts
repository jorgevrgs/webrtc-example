import { UserDto } from './user.dto';

export class UsersDto {
  users: Map<string, UserDto> = new Map();

  constructor(data?: Partial<UsersDto>) {
    Object.assign(this, data);
  }

  getUserBySocketId(socketId: string) {
    return this.users.get(socketId);
  }

  userExists(socketId: string) {
    return this.users.has(socketId);
  }

  addUser(user: UserDto) {
    this.users.set(user.socketId, new UserDto(user));

    return this;
  }

  removeUserBySocketId(socketId: string) {
    this.users.delete(socketId);

    return this;
  }
}
