import type { UserDto } from './user.dto';

export class RoomDto {
  'id': string = '';

  #_connectedUsers: Map<string, UserDto> = new Map();

  constructor(data: Partial<RoomDto>) {
    Object.assign(this, data);
  }

  addUser(user: UserDto) {
    if (!this.#_connectedUsers.has(user.socketId)) {
      this.#_connectedUsers.set(user.socketId, user);
    }

    return this;
  }

  get connectedUsers() {
    return Array.from(this.#_connectedUsers.values());
  }

  removeUserBySocketId(socketId: string) {
    this.#_connectedUsers.delete(socketId);

    return this;
  }
}
