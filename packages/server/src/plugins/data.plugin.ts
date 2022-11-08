import { FastifyPluginAsync } from 'fastify';
import { RoomsDto, UsersDto } from '../dtos';

const MAX_CONNECTIONS = 4;

export const connectedUsers = new UsersDto();
export const rooms = new RoomsDto();

declare module 'fastify' {
  interface FastifyRequest {
    rooms: RoomsDto;
    connectedUsers: UsersDto;
  }

  interface FastifyInstance {
    config: {
      MAX_CONNECTIONS: number;
    };
    rooms: RoomsDto;
    connectedUsers: UsersDto;
  }
}

export const dataPlugin: FastifyPluginAsync = async (fastify, opts) => {
  fastify.decorateRequest('connectedUsers', null);
  fastify.decorateRequest('rooms', null);
  fastify.decorate('config', {
    MAX_CONNECTIONS,
  });

  fastify
    .addHook('onRequest', (request, _reply, done) => {
      request.connectedUsers = connectedUsers;
      request.rooms = rooms;
      done();
    })
    .decorate('rooms', rooms)
    .decorate('connectedUsers', connectedUsers);
};
