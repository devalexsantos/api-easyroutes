import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaTagsRepository } from '../../repositories/prisma-tags-repository'

export async function deleteTags(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    tagId: z.string(),
  })

  const { tagId } = paramsSchema.parse(req.params)

  const tagsRepository = new PrismaTagsRepository()

  try {
    await tagsRepository.delete(tagId)

    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}
