import { ValidateCityService } from '../validate-city'

export function makeRegisterPetService() {
  const service = new ValidateCityService()

  return service
}
