import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaReposRepository } from '../../repositories/prisma-repos-repository'

export default async function deleteRepo(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(req.params)

  const reposRepository = new PrismaReposRepository()

  try {
    await reposRepository.delete(id)

    return res.status(200).send({ message: 'Repo deleted' })
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error deleting repo', error: error.message })
  }
}
