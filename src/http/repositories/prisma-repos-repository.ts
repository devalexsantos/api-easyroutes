import { prisma } from '../../lib/prisma'

interface CreateRepo {
  name: string
  html_url?: string
  description?: string
  homepage?: string
  tags: string[]
  userId: string
  categoryId?: string
}

export class PrismaReposRepository {
  async create({
    name,
    html_url,
    description,
    homepage,
    tags,
    userId,
    categoryId,
  }: CreateRepo) {
    return await prisma.repo.create({
      data: {
        name,
        html_url,
        description,
        homepage,
        tags: {
          connect: tags.map((tag) => ({
            id: tag,
          })),
        },
        user: {
          connect: {
            id: userId,
          },
        },
        category: categoryId
          ? {
              connect: {
                id: categoryId,
              },
            }
          : undefined,
      },
    })
  }
}
