import { FastifyInstance } from 'fastify'
import { createOrganizationHandler } from './create'
import { authenticateOrganizationHandler } from './authenticate'

export async function OrganizationsRoutes(app: FastifyInstance) {
  app.post('/session', authenticateOrganizationHandler)
  app.post('/organizations', createOrganizationHandler)
}
