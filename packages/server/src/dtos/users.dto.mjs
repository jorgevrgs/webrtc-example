import { UserDto } from './user.dto.mjs';

export class UsersDto {
  users = new Map();

  constructor(data) {
    Object.assign(this, data);
  }

  getUserById(id) {
    return this.users.get(id);
  }

  userExists(id) {
    return this.users.has(id);
  }

  addUser(user) {
    this.users.set(user.id, new UserDto(user));

    return this;
  }

  removeUser(id) {
    this.users.delete(id);

    return this;
  }
}
