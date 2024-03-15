import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaCategoriesRepository } from '../../repositories/prisma-categories-repository'

export async function deleteCategory(req: FastifyRequest, res: FastifyReply) {
  const paramSchema = z.object({
    categoryId: z.string(),
  })

  const { categoryId } = paramSchema.parse(req.params)

  const categoriesRepository = new PrismaCategoriesRepository()
  try {
    await categoriesRepository.delete(categoryId)
    return res.status(204).send()
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
