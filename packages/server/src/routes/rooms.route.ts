import { FastifyPluginAsync, FastifyRequest } from 'fastify';

export const roomsRoute: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get(
    '/api/room-exists/:roomId',
    (
      request: FastifyRequest<{
        Params: {
          roomId: string;
        };
      }>,
      reply
    ) => {
      const { roomId } = request.params;

      const room = request.rooms.getRoomById(roomId);

      const roomExists = room;
      const isFull = roomExists
        ? room.connectedUsers.length >= fastify.config.MAX_CONNECTIONS
        : undefined;

      reply.send({
        roomExists,
        isFull,
      });
    }
  );
};
