import { Server } from 'socket.io';
import { RoomsDto, UsersDto } from '../dtos';

export interface ServerContext {
  socket: Socket;
  io: Server;
  rooms: RoomsDto;
  connectedUsers: UsersDto;
}
