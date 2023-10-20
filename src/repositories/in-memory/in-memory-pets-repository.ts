import { Pet } from '@prisma/client'
import { CreatePetDTO, IPetsRepository } from '../IPetsRepository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  async create({
    name,
    description,
    activity_level,
    organizationId,
    age,
    independency_level,
    size,
    type,
    requirements,
  }: CreatePetDTO) {
    const pet: Pet = {
      id: randomUUID(),
      name,
      description,
      activity_level,
      organizationId,
      age,
      independency_level,
      size,
      type,
      requirements: requirements || [],
    }

    this.items.push(pet)

    return pet
  }

  items: Pet[] = []
}
