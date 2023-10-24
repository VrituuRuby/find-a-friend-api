import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterPetService } from './register-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let service: RegisterPetService

describe('Register Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    service = new RegisterPetService(petsRepository, organizationsRepository)
  })

  it('should be able to register a pet', async () => {
    const organization = await organizationsRepository.create({
      address: 'XV de Novembro',
      cep: '80020-310',
      city: 'Curitiba',
      uf: 'PR',
      number: 18,
      email: 'test@organization.com',
      password_hash: 'hashed_password',
      representative_name: 'John Doe',
      whatsapp_phone: '+5541999999999',
    })

    const { pet } = await service.execute({
      name: 'Snoopy',
      activity_level: 'HIGH',
      age: 'ADULT',
      description: 'Test Pet',
      independency_level: 'LOW',
      organizationId: organization.id,
      requirements: ['Ambiente aberto'],
      size: 'SMALL',
      type: 'DOG',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet to an inexistent organization id', () => {
    expect(async () => {
      await service.execute({
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
    }).rejects.toThrow(ResourceNotFoundError)
  })
})
