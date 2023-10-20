import { Pet } from '@prisma/client'

export type INDEPENDENCY_LEVEL = 'LOW' | 'MID' | 'HIGH'
export type ACTIVITY_LEVEL = 'LOW' | 'MID' | 'HIGH'
export type SIZE = 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
export type AGE = 'YOUNG' | 'ADULT' | 'SENIOR'
export type TYPE = 'DOG' | 'CAT'

export interface CreatePetDTO {
  name: string
  description: string
  activity_level: ACTIVITY_LEVEL
  organizationId: string
  age: AGE
  independency_level: INDEPENDENCY_LEVEL
  size: SIZE
  type: TYPE
  requirements?: string[]
}

export interface IPetsRepository {
  create(data: CreatePetDTO): Promise<Pet>
}
