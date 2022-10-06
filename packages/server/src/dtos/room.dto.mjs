export class RoomDto {
  id = '';
  #_connectedUsers = new Map();

  constructor(data) {
    Object.assign(this, data);
  }

  /**
   *
   * @param {UserDto} user
   * @returns
   */
  addUser(user) {
    if (!this.#_connectedUsers.has(user.socketId)) {
      this.#_connectedUsers.set(user.socketId, user);
    }

    return this;
  }

  get connectedUsers() {
    return Array.from(this.#_connectedUsers.values());
  }

  removeUserBySocketId(socketId) {
    this.#_connectedUsers.delete(socketId);

    return this;
  }
}
