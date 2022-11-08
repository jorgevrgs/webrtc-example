import { socketEvent } from '@app/commons';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import {
  onConnInit,
  onConnSignal,
  onCreateRoom,
  onDisconnect,
  onJoinRoom,
} from './handlers';
import { corsPlugin, dataPlugin, websocketPlugin } from './plugins';
import { roomsRoute } from './routes';
// import twilio from 'twilio';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

const app: FastifyPluginAsync = async (fastify, opts) => {
  fastify
    .register(fp(corsPlugin))
    .register(fp(dataPlugin))
    .register(fp(websocketPlugin))
    .ready((err) => {
      if (err) throw err;

      fastify.io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        const context = {
          socket,
          io: fastify.io,
          connectedUsers: fastify.connectedUsers,
          rooms: fastify.rooms,
        };

        socket
          .on(socketEvent.createRoom, (params) => onCreateRoom(params, context))
          .on(socketEvent.joinRoom, (params) => onJoinRoom(params, context))
          .on(socketEvent.connSignal, (params) => onConnSignal(params, context))
          .on(socketEvent.connInit, (params) => onConnInit(params, context))
          .on(socketEvent.disconnect, () => onDisconnect(context));
      });
    });

  fastify.register(roomsRoute);
};

export default app;
