import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'
import { FetchPetsForAdoptionService } from '../fetch-pets-for-adoption'

export function makeFetchPetsForAdoptionService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new FetchPetsForAdoptionService(petsRepository)

  return service
}
