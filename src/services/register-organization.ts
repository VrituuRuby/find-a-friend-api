import { Organization } from '@prisma/client'
import { IOrganizationsRepository } from '../repositories/IOrganizationsRepository'
import { hash } from 'bcrypt'
import { DuplicateEmailError } from './errors/duplicate-email-error'

interface RegisterOrganizationServiceParams {
  representative_name: string
  email: string
  password: string
  cep: string
  address: string
  number: number
  uf: string
  city: string
  whatsapp_phone: string
}

interface RegisterOrganizationServiceResponse {
  organization: Organization
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({
    address,
    cep,
    city,
    email,
    number,
    password,
    representative_name,
    uf,
    whatsapp_phone,
  }: RegisterOrganizationServiceParams): Promise<RegisterOrganizationServiceResponse> {
    const isEmailInUser = await this.organizationsRepository.findByEmail(email)

    if (isEmailInUser) throw new DuplicateEmailError()

    const organization = await this.organizationsRepository.create({
      address,
      cep,
      city,
      email,
      number,
      password_hash: await hash(password, 6),
      representative_name,
      uf,
      whatsapp_phone,
    })

    return {
      organization,
    }
  }
}
