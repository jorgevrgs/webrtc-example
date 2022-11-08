import { Server } from 'socket.io';
import { RoomsDto, UsersDto } from '../dtos';

export interface Context {
  socket: Socket;
  io: Server;
  rooms: RoomsDto;
  connectedUsers: UsersDto;
}
