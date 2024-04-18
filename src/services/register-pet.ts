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

interface RegisterPetServiceParams {
  name: string
  description: string
  organizationId: string
  type: TYPE
  age: AGE
  size: SIZE
  activity_level: ACTIVITY_LEVEL
  independency_level: INDEPENDENCY_LEVEL
  requirements?: string[]
  images: string[]
}

interface RegisterPetServiceResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(
    private petsRepository: IPetsRepository,
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute(
    data: RegisterPetServiceParams,
  ): Promise<RegisterPetServiceResponse> {
    const organization = await this.organizationsRepository.findById(
      data.organizationId,
    )

    if (!organization) throw new ResourceNotFoundError()

    const pet = await this.petsRepository.create(data)
    return { pet }
  }
}
