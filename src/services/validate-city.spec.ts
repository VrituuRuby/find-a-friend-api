import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateCityService } from './validate-city'
import { InvalidCityError } from './errors/invalid-city-error'

let service: ValidateCityService

describe('Validate City Service', () => {
  beforeEach(() => {
    service = new ValidateCityService()
  })
  it('should be able to validate correct state and city', async () => {
    const { success } = await service.execute({ UF: 'PR', city: 'Curitiba' })

    expect(success).toEqual(true)
  })
  it('should be able to throw error if invalid state or uf', async () => {
    await expect(async () => {
      await service.execute({ UF: 'BR', city: 'Cidade' })
    }).rejects.toThrow(InvalidCityError)
  })
})
