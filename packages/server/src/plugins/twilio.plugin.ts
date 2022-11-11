import type { FastifyPluginAsync } from 'fastify';
import * as twilio from 'twilio';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly TWILIO_ACCOUNT_SID: string;
      readonly TWILIO_AUTH_TOKEN: string;
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    twilio: twilio.Twilio;
  }
  interface FastifyRequest {
    twilio: twilio.Twilio;
  }
}

export const twilioPlugin: FastifyPluginAsync = async (fastify, opts) => {
  const client = twilio();

  fastify
    .decorate('twilio', client)
    .decorateRequest('twilio', null)
    .addHook('onRequest', async (request) => {
      if (!request.twilio) {
        request.twilio = client;
      }
    });
};
