import { PrismaOrganizationsRepository } from '../../repositories/prisma/PrismaOrganizationsRepository'
import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'
import { UpdatePetService } from '../update-pet'

export function makeUpdatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const service = new UpdatePetService(petsRepository, organizationsRepository)

  return service
}
