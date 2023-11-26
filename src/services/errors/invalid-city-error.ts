export class InvalidCityError extends Error {
  constructor() {
    super('Invalid city name or UF')
  }
}
