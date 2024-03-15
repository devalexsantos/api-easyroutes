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

  async update({ userId, premium }: { userId: string; premium: boolean }) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        premium,
      },
    })
    return user
  }

  async delete({ id }: { id: string }) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
