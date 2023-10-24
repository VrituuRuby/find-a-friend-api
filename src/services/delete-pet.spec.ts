import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeletePetService } from './delete-pet'

let petsRepository: InMemoryPetsRepository
let service: DeletePetService

describe('Delte Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    service = new DeletePetService(petsRepository)
  })
  it('should be able to delete a pet by it´s ID', async () => {
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

    await service.execute({ pet_id: createdPet.id })

    expect(petsRepository.items).toHaveLength(0)
  })
  it('should not be able to get pet by an inexistent pet_id', async () => {
    expect(async () => {
      await service.execute({ pet_id: 'random-uuid' })
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
