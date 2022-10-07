import { v4 as uuidv4 } from 'uuid';
import { RoomDto } from './room.dto.mjs';
import { UserDto } from './user.dto.mjs';

export class RoomsDto {
  /** @type {Map<string, RoomDto>} */
  rooms = new Map();

  constructor(data) {
    Object.assign(this, data);
  }

  getRoomById(id) {
    return this.rooms.get(id);
  }

  hasRoom(id) {
    return this.rooms.has(id);
  }

  joinRoom(roomId, identity, socketId) {
    const userId = uuidv4();

    const user = new UserDto({
      id: userId,
      identity,
      socketId,
      roomId,
    });

    this.rooms.get(roomId).addUser(user);

    return user;
  }

  createRoom(socketId, identity) {
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

  removeUserFromRoom(roomId, socketId) {
    this.rooms.get(roomId).removeUserBySocketId(socketId);

    return this;
  }

  /**
   *
   * @param {string} id room id
   * @returns {RoomsDto}
   */
  removeRoom(id) {
    this.rooms.delete(id);

    return this;
  }

  /**
   *
   * @param {string} id room id
   * @returns {UserDto[]}
   */
  getRoomUsers(id) {
    return this.rooms.get(id).connectedUsers;
  }
}
