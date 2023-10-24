import { Pet } from '@prisma/client'
import {
  CreatePetDTO,
  FindManyByCityOnUFParams,
  IPetsRepository,
} from '../IPetsRepository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  items: Pet[] = []
  async save(pet: Pet) {
    const petIndex = this.items.findIndex((item) => item.id === pet.id)

    if (petIndex >= 0) {
      this.items[petIndex] = pet
    }

    return pet
  }

  async deleteById(pet_id: string) {
    this.items = this.items.filter((pet) => pet.id !== pet_id)
  }

  async findById(pet_id: string) {
    const pet = this.items.find((pet) => pet.id === pet_id)
    return pet || null
  }

  async findManyByCityOnUF(data: FindManyByCityOnUFParams) {
    const pets = this.items.filter((pet) => {
      const hasActivtyLevel =
        data.activity_level === undefined ||
        data.activity_level === pet.activity_level
      const hasAge = data.age === undefined || data.age === pet.age
      const hasIndependencyLevel =
        data.independency_level === undefined ||
        data.independency_level === pet.independency_level
      const hasSize = data.size === undefined || data.size === pet.size
      const hasType = data.type === undefined || data.type === pet.type

      if (
        hasActivtyLevel &&
        hasAge &&
        hasIndependencyLevel &&
        hasSize &&
        hasType
      ) {
        return true
      }
      return false
    })
    return pets.splice((data.page - 1) * 20, data.page * 20)
  }

  async create(data: CreatePetDTO) {
    const pet: Pet = {
      id: randomUUID(),
      ...data,
      requirements: data.requirements || [],
    }

    this.items.push(pet)

    return pet
  }
}
