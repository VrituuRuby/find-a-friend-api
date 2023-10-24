import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { UpdatePetService } from './update-pet'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let service: UpdatePetService

describe('Update Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    service = new UpdatePetService(petsRepository, organizationsRepository)
  })
  it('should be able to update a pet by its ID', async () => {
    const createdPet = await petsRepository.create({
      activity_level: 'LOW',
      age: 'SENIOR',
      description: 'Desc',
      independency_level: 'LOW',
      name: 'TestPet',
      organizationId: 'random-uuid',
      size: 'MEDIUM',
      type: 'CAT',
      requirements: ['Requisito'],
    })

    const { pet } = await service.execute({
      id: createdPet.id,
      name: 'Chocolate',
      activity_level: 'HIGH',
      age: 'ADULT',
      type: 'DOG',
    })

    expect(petsRepository.items).toEqual([
      expect.objectContaining({
        name: 'Chocolate',
        activity_level: 'HIGH',
        type: 'DOG',
      }),
    ])
    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Chocolate',
        activity_level: 'HIGH',
        type: 'DOG',
      }),
    )
  })
})
