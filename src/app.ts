import Fastify from 'fastify'
import { helloWorld } from './http/controllers/hello-world'
import { PetsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'
import env from './env'

const app = Fastify()

app.get('/', helloWorld)

app.register(PetsRoutes)

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
