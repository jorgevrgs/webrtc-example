import fastifyCors from '@fastify/cors';
import { FastifyPluginAsync } from 'fastify';

export const corsPlugin: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(fastifyCors);
};
