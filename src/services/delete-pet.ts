import { IPetsRepository } from '../repositories/IPetsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeletePetServiceParams {
  pet_id: string
}

type DeletePetServiceResponse = void

export class DeletePetService {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    pet_id,
  }: DeletePetServiceParams): Promise<DeletePetServiceResponse> {
    const pet = await this.petsRepository.findById(pet_id)
    if (!pet) throw new ResourceNotFoundError()

    await this.petsRepository.deleteById(pet_id)
  }
}
