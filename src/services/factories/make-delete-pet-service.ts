import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'
import { DeletePetService } from '../delete-pet'

export function makeDeletePetService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new DeletePetService(petsRepository)

  return service
}
