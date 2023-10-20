import { Pet } from '@prisma/client'
import {
  ACTIVITY_LEVEL,
  IPetsRepository,
  AGE,
  INDEPENDENCY_LEVEL,
  SIZE,
  TYPE,
} from '../repositories/IPetsRepository'

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
}

interface RegisterPetServiceResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(
    data: RegisterPetServiceParams,
  ): Promise<RegisterPetServiceResponse> {
    const pet = await this.petsRepository.create(data)
    return { pet }
  }
}
