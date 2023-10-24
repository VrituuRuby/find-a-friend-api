import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
}
