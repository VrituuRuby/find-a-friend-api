import { FastifyInstance } from 'fastify'
import { createPetHandler } from './create'
import { verifyJWT } from '../../middlewares/verifyJWT'
import { fetchImageHandle } from './fetch-image'

export async function PetsRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: [verifyJWT] }, createPetHandler)

  app.get('/pets/images/:filename', fetchImageHandle)
}
