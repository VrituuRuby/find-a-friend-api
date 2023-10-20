import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
