import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaCategoriesRepository } from '../../repositories/prisma-categories-repository'

export async function updateCategory(req: FastifyRequest, res: FastifyReply) {
  const paramSchema = z.object({
    categoryId: z.string(),
  })

  const bodySchema = z.object({
    name: z.string(),
  })

  const { categoryId } = paramSchema.parse(req.params)
  const { name } = bodySchema.parse(req.body)

  const categoriesRepository = new PrismaCategoriesRepository()

  try {
    const category = await categoriesRepository.update({ categoryId, name })
    return res.status(200).send({ message: 'Category Updated', category })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
