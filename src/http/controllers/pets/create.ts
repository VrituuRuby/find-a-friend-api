import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterPetService } from '../../../services/factories/make-register-pet-service'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../services/errors/resource-not-found-error'

export async function createPetHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    organizationId: z.string(), // TODO: change to get organization ID from authentication token
    type: z.enum(['CAT', 'DOG']),
    age: z.enum(['YOUNG', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    activity_level: z.enum(['LOW', 'MID', 'HIGH']),
    independency_level: z.enum(['LOW', 'MID', 'HIGH']),
    requirements: z.array(z.string()),
  })

  const data = registerPetBodySchema.parse(request.body)

  const registerPetService = makeRegisterPetService()

  try {
    const { pet } = await registerPetService.execute(data)
    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: error.message })
    }
    throw error
  }
}
