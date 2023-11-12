import { PrismaOrganizationsRepository } from '../../repositories/prisma/PrismaOrganizationsRepository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const service = new AuthenticateService(organizationsRepository)

  return service
}
