import { Pet } from '@prisma/client'

export type INDEPENDENCY_LEVEL = 'LOW' | 'MID' | 'HIGH'
export type ACTIVITY_LEVEL = 'LOW' | 'MID' | 'HIGH'
export type SIZE = 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
export type AGE = 'YOUNG' | 'ADULT' | 'SENIOR'
export type TYPE = 'DOG' | 'CAT'

export interface CreatePetDTO {
  name: string
  description: string
  organizationId: string
  requirements?: string[]
  type: TYPE
  age: AGE
  activity_level: ACTIVITY_LEVEL
  independency_level: INDEPENDENCY_LEVEL
  size: SIZE
}

export interface FindManyByCityOnUFParams {
  uf: string
  city: string
  type?: TYPE
  age?: AGE
  activity_level?: ACTIVITY_LEVEL
  independency_level?: INDEPENDENCY_LEVEL
  size?: SIZE
  page: number
}

export interface IPetsRepository {
  create(data: CreatePetDTO): Promise<Pet>
  findManyByCityOnUF(data: FindManyByCityOnUFParams): Promise<Pet[]>
  findById(pet_id: string): Promise<Pet | null>
  deleteById(pet_id: string): Promise<void>
  save(pet: Pet): Promise<Pet>
}
