import { SOCKET_EVENT } from '@app/commons';
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

      fastify.io.on(SOCKET_EVENT.connection, (socket) => {
        console.log('User connected', socket.id);

        const context = {
          socket,
          io: fastify.io,
          connectedUsers: fastify.connectedUsers,
          rooms: fastify.rooms,
        };

        socket
          .on(SOCKET_EVENT.createRoom, (params: any) =>
            onCreateRoom(params, context)
          )
          .on(SOCKET_EVENT.joinRoom, (params: any) =>
            onJoinRoom(params, context)
          )
          .on(SOCKET_EVENT.connSignal, (params: any) =>
            onConnSignal(params, context)
          )
          .on(SOCKET_EVENT.connInit, (params: any) =>
            onConnInit(params, context)
          )
          .on(SOCKET_EVENT.disconnect, () => onDisconnect(context));
      });
    });

  fastify.register(roomsRoute);
};

export default app;
