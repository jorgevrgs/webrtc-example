import { FastifyPluginAsync } from 'fastify';

export const credentialsRoute: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/api/turn-credentials', async (request, reply) => {
    try {
      const token = await request.twilio.tokens.create();

      request.log.info({ token });

      return {
        token,
      };
    } catch (error) {
      request.log.error(error);

      return {
        token: null,
      };
    }
  });
};
