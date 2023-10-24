import { Pet } from '@prisma/client'
import { IPetsRepository } from '../repositories/IPetsRepository'

interface FetchPetsForAdoptionServiceParams {
  uf: string
  city: string
  type?: 'CAT' | 'DOG'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
  activityLevel?: 'LOW' | 'MID' | 'HIGH'
  age?: 'YOUNG' | 'ADULT' | 'SENIOR'
  indenpendencyLevel?: 'LOW' | 'MID' | 'HIGH'
  page: number
}

interface FetchPetsForAdoptionServiceResponse {
  pets: Pet[]
}

export class FetchPetsForAdoptionService {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    uf,
    type,
    activityLevel,
    age,
    size,
    indenpendencyLevel,
    page,
  }: FetchPetsForAdoptionServiceParams): Promise<FetchPetsForAdoptionServiceResponse> {
    const pets = await this.petsRepository.findManyByCityOnUF({
      uf,
      city,
      type,
      activity_level: activityLevel,
      age,
      independency_level: indenpendencyLevel,
      size,
      page,
    })

    return { pets }
  }
}
