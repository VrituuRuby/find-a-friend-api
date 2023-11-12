import { FastifyInstance } from 'fastify'
import { createPetHandler } from './create'

export async function PetsRoutes(app: FastifyInstance) {
  app.post('/pets', createPetHandler)
}
