import { Organization, Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '../IOrganizationsRepository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationsRepository
  implements IOrganizationsRepository
{
  items: Organization[] = []
  async findById(id: string) {
    const organization = this.items.find((org) => org.id === id)
    return organization || null
  }

  async findByEmail(email: string) {
    const organization = this.items.find((org) => org.email === email)
    return organization || null
  }

  async create({
    address,
    cep,
    city,
    email,
    number,
    password_hash,
    representative_name,
    uf,
    whatsapp_phone,
  }: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      address,
      cep,
      city,
      email,
      number,
      password_hash,
      representative_name,
      uf,
      whatsapp_phone,
    }

    this.items.push(organization)

    return organization
  }
}
