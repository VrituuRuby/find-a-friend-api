import { Pet } from '@prisma/client'
import {
  ACTIVITY_LEVEL,
  IPetsRepository,
  AGE,
  INDEPENDENCY_LEVEL,
  SIZE,
  TYPE,
} from '../repositories/IPetsRepository'
import { IOrganizationsRepository } from '../repositories/IOrganizationsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdatePetServiceParams {
  id: string
  name?: string
  description?: string
  type?: TYPE
  age?: AGE
  size?: SIZE
  activity_level?: ACTIVITY_LEVEL
  independency_level?: INDEPENDENCY_LEVEL
  requirements?: string[]
}

interface UpdatePetServiceResponse {
  pet: Pet
}

export class UpdatePetService {
  constructor(
    private petsRepository: IPetsRepository,
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute(
    data: UpdatePetServiceParams,
  ): Promise<UpdatePetServiceResponse> {
    const pet = await this.petsRepository.findById(data.id)

    if (!pet) throw new ResourceNotFoundError()

    const updatedPet = await this.petsRepository.save({ ...pet, ...data })

    return { pet: updatedPet }
  }
}
