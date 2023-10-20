import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateCityService } from './validate-city'

let service: ValidateCityService

describe('Validate City Service', () => {
  beforeEach(() => {
    service = new ValidateCityService()
  })
  it('should be able to validate state and city', async () => {
    const { success } = await service.execute({ UF: 'PR', city: 'Curitiba' })

    expect(success).toEqual(true)
  })
})
