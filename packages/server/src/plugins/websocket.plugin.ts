import { FastifyPluginAsync } from 'fastify';
import fastifySockerIo from 'fastify-socket.io';

export const websocketPlugin: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(fastifySockerIo, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
};
