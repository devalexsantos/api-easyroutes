import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaTagsRepository } from '../../repositories/prisma-tags-repository'

export async function createTags(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    userId: z.string(),
    name: z.string(),
  })

  const { name, userId } = bodySchema.parse(req.body)

  const tagsRepository = new PrismaTagsRepository()

  try {
    const existingTag = await tagsRepository.findByName({ name, userId })

    if (existingTag) {
      return res.status(400).send({ message: 'Tag already exists' })
    }

    const tag = await tagsRepository.create({ name, userId })

    res.status(201).send(tag)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}
