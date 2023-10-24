import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let service: AuthenticateService

describe('Register Organization Service', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    service = new AuthenticateService(organizationsRepository)
  })

  it('should be able to authenticate an organization', async () => {
    await organizationsRepository.create({
      address: 'XV de Novembro',
      cep: '81200000',
      city: 'Curitiba',
      uf: 'PR',
      email: 'test@organization.com',
      number: 3,
      password_hash: await hash('123123', 6),
      representative_name: 'John Doe',
      whatsapp_phone: '1234567890',
    })
    const { organization } = await service.execute({
      email: 'test@organization.com',
      password: '123123',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    await organizationsRepository.create({
      address: 'XV de Novembro',
      cep: '81200000',
      city: 'Curitiba',
      uf: 'PR',
      email: 'test@organization.com',
      number: 3,
      password_hash: await hash('123123', 6),
      representative_name: 'John Doe',
      whatsapp_phone: '1234567890',
    })
    expect(async () => {
      await service.execute({
        email: 'test@organization.com',
        password: 'wrong-password',
      })
    }).rejects.toThrow(InvalidCredentialsError)
    expect(async () => {
      await service.execute({
        email: 'wrong@organization.com',
        password: '123123',
      })
    }).rejects.toThrow(InvalidCredentialsError)
  })
})
