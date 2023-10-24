import { Pet } from '@prisma/client'
import { IPetsRepository } from '../repositories/IPetsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetServiceParams {
  pet_id: string
}

interface GetPetServiceResponse {
  pet: Pet
}
export class GetPetService {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    pet_id,
  }: GetPetServiceParams): Promise<GetPetServiceResponse> {
    const pet = await this.petsRepository.findById(pet_id)
    if (!pet) throw new ResourceNotFoundError()
    return { pet }
  }
}
