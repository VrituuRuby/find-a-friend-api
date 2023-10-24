import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetService } from './get-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let service: GetPetService

describe('Get Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    service = new GetPetService(petsRepository)
  })
  it('should be able to get a pet by its id', async () => {
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

    const { pet } = await service.execute({ pet_id: createdPet.id })

    expect(pet.name).toEqual('TestPet')
  })
  it('should not be able to get pet by an inexistent pet_id', async () => {
    expect(async () => {
      await service.execute({ pet_id: 'random-uuid' })
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
