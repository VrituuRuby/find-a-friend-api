import { FastifyInstance } from 'fastify'
import { createPetHandler } from './create'
import { verifyJWT } from '../../middlewares/verifyJWT'

export async function PetsRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: [verifyJWT] }, createPetHandler)
}
