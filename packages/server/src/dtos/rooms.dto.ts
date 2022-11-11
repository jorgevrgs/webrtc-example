import { RoomDto } from './room.dto';
import { UserDto } from './user.dto';

export class RoomsDto {
  rooms: Map<string, RoomDto> = new Map();

  constructor(data?: Partial<RoomsDto>) {
    Object.assign(this, data);
  }

  getRoomById(id: string) {
    return this.rooms.get(id);
  }

  hasRoom(id: string) {
    return this.rooms.has(id);
  }

  joinRoom(params: Partial<UserDto>) {
    const user = new UserDto(params);

    this.rooms.get(user.roomId)?.addUser(user);

    return user;
  }

  createRoom(params: Partial<UserDto>) {
    const user = new UserDto(params);

    const room = new RoomDto({
      id: user.roomId,
    });

    room.addUser(user);

    this.rooms.set(room.id, room);

    return {
      user,
      room,
    };
  }

  removeUserFromRoom(roomId: string, socketId: string) {
    this.rooms.get(roomId)?.removeUserBySocketId(socketId);

    return this;
  }

  removeRoom(id: string) {
    this.rooms.delete(id);

    return this;
  }

  getUsersByRoomId(id: string) {
    return this.rooms.get(id)?.connectedUsers;
  }
}
