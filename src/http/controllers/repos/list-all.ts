import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaReposRepository } from '../../repositories/prisma-repos-repository'
import { z } from 'zod'

export async function listAllRepos(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    owner: z.string(),
  })

  const { page = 1, perPage = 30 } = req.query as {
    page?: number
    perPage?: number
  }

  const { owner } = bodySchema.parse(req.params)

  const reposRepository = new PrismaReposRepository()

  try {
    const repos = await reposRepository.listAll({ owner, page, perPage })

    return res.status(200).send(repos)
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error listing repos', error: error.message })
  }
}
