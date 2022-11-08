import fastify from 'fastify';
import app from './app';

const server = fastify({
  // logger pino-pretty
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
});

server.register(app);

server.listen({
  port: 1337,
  host: '0.0.0.0',
});
