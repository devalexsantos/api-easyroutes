import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaTagsRepository } from '../../repositories/prisma-tags-repository'

export async function listAllTags(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = paramsSchema.parse(req.params)

  const tagsRepository = new PrismaTagsRepository()

  try {
    const tags = await tagsRepository.listAll(userId)

    res.status(200).send(tags)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}
