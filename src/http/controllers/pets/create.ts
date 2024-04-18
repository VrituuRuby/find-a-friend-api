import fs from 'node:fs'
import util from 'node:util'
import { pipeline } from 'node:stream'

import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeRegisterPetService } from '../../../services/factories/make-register-pet-service'
import { ResourceNotFoundError } from '../../../services/errors/resource-not-found-error'

const pump = util.promisify(pipeline)

export async function createPetHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(['CAT', 'DOG']),
    age: z.enum(['YOUNG', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    activity_level: z.enum(['LOW', 'MID', 'HIGH']),
    independency_level: z.enum(['LOW', 'MID', 'HIGH']),
    requirements: z.string(),
  })

  const parts = request.parts()

  let requestBody = {}

  const filesPaths: string[] = []

  for await (const part of parts) {
    if (part.type === 'field') {
      requestBody = {
        ...requestBody,
        [part.fieldname]: part.value,
      }
    } else {
      const filePath = `./tmp/uploads/${Date.now() + part.filename}`

      await pump(part.file, fs.createWriteStream(filePath))
      filesPaths.push(filePath)
    }
  }

  const registerPetService = makeRegisterPetService()

  try {
    const data = registerPetBodySchema.parse(requestBody)
    const organizationId = request.user.sub
    const images = filesPaths.map((path) => {
      const fileName = path.split('/')[3]

      return `http://localhost:3333/pets/images/${fileName}`
    })

    const { pet } = await registerPetService.execute({
      ...data,
      images,
      requirements: data.requirements.split(','),
      organizationId,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    filesPaths.forEach((path) => {
      // Deletes uploaded files in case of error
      fs.unlinkSync(path)
    })

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: error.message, atumalaca: true })
    }

    throw error
  }
}
