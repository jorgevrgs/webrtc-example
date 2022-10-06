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
    this.#_connectedUsers.set(user.id, user);

    return this;
  }

  get connectedUsers() {
    return Array.from(this.#_connectedUsers.values());
  }
}
