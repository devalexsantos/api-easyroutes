import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaReposRepository } from '../../repositories/prisma-repos-repository'

export async function createRepo(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    html_url: z.string().optional(),
    description: z.string().optional(),
    homepage: z.string().optional(),
    tags: z.array(z.string()),
    userId: z.string(),
    categoryId: z.string().optional(),
  })

  const body = bodySchema.parse(req.body)

  const reposRepository = new PrismaReposRepository()

  try {
    await reposRepository.create(body)

    return res.status(201).send({ message: 'Repo created' })
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error creating repo', error: error.message })
  }
}
