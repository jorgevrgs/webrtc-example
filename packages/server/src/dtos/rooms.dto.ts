import { v4 as uuidv4 } from 'uuid';
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

  joinRoom(roomId: string, identity: string, socketId: string) {
    const userId = uuidv4();

    const user = new UserDto({
      id: userId,
      identity,
      socketId,
      roomId,
    });

    this.rooms.get(roomId)?.addUser(user);

    return user;
  }

  createRoom(socketId: string, identity: string) {
    const userId = uuidv4();
    const roomId = uuidv4();

    const user = new UserDto({
      id: userId,
      identity,
      socketId,
      roomId,
    });

    const room = new RoomDto({
      id: roomId,
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
