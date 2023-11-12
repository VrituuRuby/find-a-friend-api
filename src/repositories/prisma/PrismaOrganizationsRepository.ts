import { Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '../IOrganizationsRepository'
import { prisma } from '../../libs/prisma'

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    return await prisma.organization.create({ data })
  }

  async findByEmail(email: string) {
    return await prisma.organization.findUnique({ where: { email } })
  }

  async findById(id: string) {
    return await prisma.organization.findFirst({ where: { id } })
  }
}
