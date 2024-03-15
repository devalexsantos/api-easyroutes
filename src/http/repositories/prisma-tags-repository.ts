import { prisma } from '../../lib/prisma'

export class PrismaTagsRepository {
  async create({ name, userId }) {
    return await prisma.tag.create({
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
    return await prisma.tag.findMany({
      where: {
        user: {
          id,
        },
      },
    })
  }

  async findByName({ name, userId }: { name: string; userId: string }) {
    return await prisma.tag.findFirst({
      where: {
        name,
        userId,
      },
    })
  }

  async update({ tagId, name }) {
    return await prisma.tag.update({
      where: {
        id: tagId,
      },
      data: {
        name,
      },
    })
  }

  async delete(tagId: string) {
    return await prisma.tag.delete({
      where: {
        id: tagId,
      },
    })
  }
}
