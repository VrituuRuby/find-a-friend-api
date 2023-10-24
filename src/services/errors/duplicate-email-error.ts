export class DuplicateEmailError extends Error {
  constructor() {
    super('Email is already being in use')
  }
}
