import { compare } from 'bcrypt'
import { IOrganizationsRepository } from '../repositories/IOrganizationsRepository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Organization } from '@prisma/client'

interface AuthenticateServiceRequestParams {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  organization: Organization
}

export class AuthenticateService {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateServiceRequestParams): Promise<AuthenticateServiceResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) throw new InvalidCredentialsError()

    const matchPasswords = await compare(password, organization.password_hash)

    if (!matchPasswords) throw new InvalidCredentialsError()

    return { organization }
  }
}
