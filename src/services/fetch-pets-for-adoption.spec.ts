import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsForAdoptionService } from './fetch-pets-for-adoption'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let service: FetchPetsForAdoptionService

describe('Fetch Pets For Adoption Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    service = new FetchPetsForAdoptionService(petsRepository)
  })

  it('Should be able to fetch pets by UF and City', async () => {
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

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Gandalf',
      activity_level: 'LOW',
      age: 'ADULT',
      description: 'Test Pet Cat',
      independency_level: 'LOW',
      organizationId: organization.id,
      requirements: ['Ambiente aberto'],
      size: 'SMALL',
      type: 'CAT',
    })
    const { pets } = await service.execute({
      city: 'Curtiba',
      uf: 'PR',
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })
  it('Should be able to fetch pets by UF and City and filters', async () => {
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

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Gandalf',
      activity_level: 'LOW',
      age: 'ADULT',
      description: 'Test Pet Cat',
      independency_level: 'LOW',
      organizationId: organization.id,
      requirements: ['Ambiente aberto'],
      size: 'SMALL',
      type: 'CAT',
    })
    await petsRepository.create({
      name: 'Smaug',
      activity_level: 'LOW',
      age: 'SENIOR',
      description: 'Test Pet Cat',
      independency_level: 'LOW',
      organizationId: organization.id,
      requirements: ['Ambiente aberto'],
      size: 'GIANT',
      type: 'CAT',
    })
    const { pets } = await service.execute({
      city: 'Curtiba',
      uf: 'PR',
      type: 'CAT',
      age: 'SENIOR',
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })
  it('Should be able to fetch pets by pages of 20', async () => {
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

    for (let i = 0; i < 22; i++) {
      await petsRepository.create({
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
    }

    const { pets } = await service.execute({
      city: 'Curtiba',
      uf: 'PR',
      page: 2,
    })

    expect(pets).toHaveLength(2)
  })
})
