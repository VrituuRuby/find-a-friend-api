import Fastify from 'fastify'
import { helloWorld } from './http/controllers/hello-world'

const app = Fastify()

app.get('/', helloWorld)

export { app }
