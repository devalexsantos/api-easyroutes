import { prisma } from '../../lib/prisma'

export class PrismaCategoriesRepository {
  async create({ name, userId }) {
    return await prisma.category.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async listAll(id: string) {
    return await prisma.category.findMany({
      where: {
        user: {
          id,
        },
      },
    })
  }

  async findByName({ name, userId }: { name: string; userId: string }) {
    return await prisma.category.findFirst({
      where: {
        name,
        userId,
      },
    })
  }

  async update({ categoryId, name }) {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    })
  }

  async delete(categoryId: string) {
    return await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })
  }
}
