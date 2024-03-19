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

interface UpdateRepo {
  id: string
  name?: string
  html_url?: string
  description?: string
  homepage?: string
  tags: string[]
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

  async listAll({
    owner,
    page,
    perPage,
  }: {
    owner: string
    page: number
    perPage: number
  }) {
    const itemsPerPage = parseInt(perPage.toString())

    const repos = await prisma.repo.findMany({
      skip: (page - 1) * perPage,
      take: itemsPerPage,
      where: {
        user: {
          id: owner,
        },
      },
      include: {
        tags: true,
        category: true,
      },
    })

    const totalCount = await prisma.repo.count()
    const totalPages = Math.ceil(totalCount / perPage)

    let nextPage: string | null = null
    let prevPage: string | null = null

    if (page < totalPages) {
      nextPage = `/repos/${owner}?page=${parseInt(page.toString()) + 1}&perPage=${perPage}`
    }

    if (page > 1) {
      prevPage = `/repos/${owner}?page=${parseInt(page.toString()) - 1}&perPage=${perPage}`
    }

    return {
      data: repos,
      pagination: {
        nextPage,
        prevPage,
        totalPages,
        currentPage: page,
        perPage,
      },
    }
  }

  async update({
    id,
    name,
    html_url,
    description,
    homepage,
    tags,
    categoryId,
  }: UpdateRepo) {
    return await prisma.repo.update({
      where: {
        id,
      },
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

  async delete(id: string) {
    return await prisma.repo.delete({
      where: {
        id,
      },
    })
  }
}
