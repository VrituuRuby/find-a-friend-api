import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterPetService } from './register-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let service: RegisterPetService

describe('Register Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    service = new RegisterPetService(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await service.execute({
      name: 'Snoopy',
      activity_level: 'HIGH',
      age: 'ADULT',
      description: 'Test Pet',
      independency_level: 'LOW',
      organizationId: 'random-uuid',
      requirements: ['Ambiente aberto'],
      size: 'SMALL',
      type: 'DOG',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
