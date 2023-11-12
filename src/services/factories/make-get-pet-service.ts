import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'
import { GetPetService } from '../get-pet'

export function makeGetPetService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new GetPetService(petsRepository)

  return service
}
