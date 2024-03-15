import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaCategoriesRepository } from '../../repositories/prisma-categories-repository'
import { z } from 'zod'

export async function listAllCategories(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const paramSchema = z.object({
    userId: z.string(),
  })

  const { userId } = paramSchema.parse(req.params)

  const categoriesRepository = new PrismaCategoriesRepository()
  try {
    const categories = await categoriesRepository.listAll(userId)
    return res.status(200).send(categories)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
