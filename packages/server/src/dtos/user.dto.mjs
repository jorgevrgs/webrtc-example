export class UserDto {
  /** @type {string} */
  id = '';

  /** @type {string} */
  identity = '';

  /** @type {string} */
  socketId = '';

  /** @type {string} */
  roomId = '';

  constructor(data) {
    Object.assign(this, data);
  }
}
