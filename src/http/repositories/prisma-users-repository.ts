import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository {
  async create({ id }: { id: string }) {
    const user = await prisma.user.create({
      data: {
        id,
      },
    })
    return user
  }

  async listAll() {
    const users = await prisma.user.findMany()
    return users
  }

  async delete({ id }: { id: string }) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
