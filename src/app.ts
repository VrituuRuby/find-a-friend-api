import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import multer from 'fastify-multer'
import { ZodError } from 'zod'

import env from './env'

import { helloWorld } from './http/controllers/hello-world'
import { PetsRoutes } from './http/controllers/pets/routes'
import { OrganizationsRoutes } from './http/controllers/organizations/routes'

const app = Fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(multer.contentParser)

app.get('/', helloWorld)
app.register(PetsRoutes)
app.register(OrganizationsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})

export { app }
