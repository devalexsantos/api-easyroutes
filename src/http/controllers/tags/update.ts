import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaTagsRepository } from '../../repositories/prisma-tags-repository'

export async function updateTags(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    tagId: z.string(),
  })

  const bodySchema = z.object({
    name: z.string(),
  })

  const { tagId } = paramsSchema.parse(req.params)
  const { name } = bodySchema.parse(req.body)

  const tagsRepository = new PrismaTagsRepository()

  try {
    const tag = await tagsRepository.update({ tagId, name })

    res.status(200).send(tag)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}
