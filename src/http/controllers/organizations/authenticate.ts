import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateService } from '../../../services/factories/make-authenticate-service'
import { InvalidCredentialsError } from '../../../services/errors/invalid-credentials-error'

export async function authenticateOrganizationHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateOrganizationSchema.parse(request.body)

  const authenticateService = makeAuthenticateService()

  try {
    const { organization } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(202).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: error.message })
    }

    throw error
  }
}
