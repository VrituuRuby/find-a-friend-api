import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterOrganizationService } from './register-organization'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { DuplicateEmailError } from './errors/duplicate-email-error'

let organizationsRepository: InMemoryOrganizationsRepository
let service: RegisterOrganizationService

describe('Register Organization Service', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    service = new RegisterOrganizationService(organizationsRepository)
  })

  it('should be able to register an organization', async () => {
    const { organization } = await service.execute({
      address: 'XV de Novembro',
      cep: '80020-310',
      city: 'Curitiba',
      uf: 'PR',
      number: 18,
      email: 'test@organization.com',
      password: '123123',
      representative_name: 'John Doe',
      whatsapp_phone: '+5541999999999',
    })

    expect(organization).toHaveProperty('id')
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register an organization with already existing email', async () => {
    await service.execute({
      address: 'XV de Novembro',
      cep: '80020-310',
      city: 'Curitiba',
      uf: 'PR',
      number: 18,
      email: 'test@organization.com',
      password: '123123',
      representative_name: 'John Doe',
      whatsapp_phone: '+5541999999999',
    })

    expect(async () => {
      await service.execute({
        address: 'XV de Novembro',
        cep: '80020-310',
        city: 'Curitiba',
        uf: 'PR',
        number: 18,
        email: 'test@organization.com',
        password: '123123',
        representative_name: 'John Doe',
        whatsapp_phone: '+5541999999999',
      })
    }).rejects.toThrow(DuplicateEmailError)
  })
})
