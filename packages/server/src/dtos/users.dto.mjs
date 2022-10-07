import { UserDto } from './user.dto.mjs';

export class UsersDto {
  /** @type {Map<string, UserDto>} */
  users = new Map();

  constructor(data) {
    Object.assign(this, data);
  }

  /**
   *
   * @param {string} socketId Socket id
   * @returns {UserDto}
   */
  getUserBySocketId(socketId) {
    return this.users.get(socketId);
  }

  /**
   *
   * @param {string} socketId Socket id
   * @returns {boolean}
   */
  userExists(socketId) {
    return this.users.has(socketId);
  }

  /**
   *
   * @param {UserDto} user
   * @returns {UsersDto}
   */
  addUser(user) {
    this.users.set(user.socketId, new UserDto(user));

    return this;
  }

  /**
   *
   * @param {string} socketId Socket id
   * @returns {UserDto}
   */
  removeUserBySocketId(socketId) {
    this.users.delete(socketId);

    return this;
  }
}
