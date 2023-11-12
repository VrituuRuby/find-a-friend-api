import { PrismaOrganizationsRepository } from '../../repositories/prisma/PrismaOrganizationsRepository'
import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'
import { RegisterPetService } from '../register-pet'

export function makeRegisterPetService() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const service = new RegisterPetService(
    petsRepository,
    organizationsRepository,
  )
  return service
}
