import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterOrganizationService } from '../../../services/factories/make-register-organization-service'
import { DuplicateEmailError } from '../../../services/errors/duplicate-email-error'
import { InvalidCityError } from '../../../services/errors/invalid-city-error'
import { makeValidateCityService } from '../../../services/factories/make-validate-city-service'

export async function createOrganizationHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationSchema = z.object({
    representative_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    number: z.coerce.number(),
    uf: z.string(),
    city: z.string(),
    whatsapp_phone: z.string(),
  })

  const {
    address,
    cep,
    city,
    email,
    number,
    password,
    representative_name,
    uf,
    whatsapp_phone,
  } = registerOrganizationSchema.parse(request.body)

  const registerOrganizationService = makeRegisterOrganizationService()

  // API da IBGE Não está funcionando mais
  const validateCityService = makeValidateCityService()

  try {
    await validateCityService.execute({ UF: uf, city })

    const { organization } = await registerOrganizationService.execute({
      address,
      cep,
      city,
      email,
      number,
      password,
      representative_name,
      uf,
      whatsapp_phone,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...organizationWithoutPassword } = organization

    return reply.status(201).send({ organization: organizationWithoutPassword })
  } catch (error) {
    if (
      error instanceof DuplicateEmailError ||
      error instanceof InvalidCityError
    ) {
      return reply.status(409).send({ error: error.message })
    }

    throw error
  }
}
