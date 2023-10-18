import { FastifyReply, FastifyRequest } from 'fastify'

export function helloWorld(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ message: 'Hello World' })
}
