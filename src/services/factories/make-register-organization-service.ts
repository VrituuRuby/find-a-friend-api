import { PrismaOrganizationsRepository } from '../../repositories/prisma/PrismaOrganizationsRepository'
import { RegisterOrganizationService } from '../register-organization'

export function makeRegisterOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const service = new RegisterOrganizationService(organizationsRepository)

  return service
}
