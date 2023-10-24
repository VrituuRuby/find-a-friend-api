import { ibge_api } from '../libs/axios'
import { InvalidCityError } from './errors/invalid-city-error'

interface ValidateCityServiceParams {
  UF: string
  city: string
}

interface ValidateCityServiceResponse {
  success: boolean
}

type City = {
  nome: string
}

const brazilianStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

export class ValidateCityService {
  async execute({
    UF,
    city,
  }: ValidateCityServiceParams): Promise<ValidateCityServiceResponse> {
    if (!brazilianStates.includes(UF)) {
      throw new InvalidCityError()
    }

    const URL = `/localidades/estados/${UF}/distritos`
    const getCitiesByUFResponse = await ibge_api.get<City[]>(URL)

    const cities = getCitiesByUFResponse.data
    const citiesNames = cities.map((city) => city.nome)

    if (!citiesNames.includes(city)) {
      throw new InvalidCityError()
    }

    return {
      success: true,
    }
  }
}
