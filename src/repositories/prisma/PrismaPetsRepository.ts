import {
  CreatePetDTO,
  FindManyByCityOnUFParams,
  IPetsRepository,
} from '../IPetsRepository'
import { prisma } from '../../libs/prisma'
import { Pet } from '@prisma/client'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: CreatePetDTO) {
    return await prisma.pet.create({ data })
  }

  async findManyByCityOnUF({
    city,
    uf,
    page,
    activity_level,
    age,
    independency_level,
    size,
    type,
  }: FindManyByCityOnUFParams) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: { uf, city },
        age,
        activity_level,
        independency_level,
        size,
        type,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }

  async findById(pet_id: string) {
    return await prisma.pet.findFirst({ where: { id: pet_id } })
  }

  async deleteById(pet_id: string) {
    await prisma.pet.delete({ where: { id: pet_id } })
  }

  async save(pet: Pet) {
    return await prisma.pet.update({ where: { id: pet.id }, data: { ...pet } })
  }
}
