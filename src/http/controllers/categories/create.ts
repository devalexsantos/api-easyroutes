import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaCategoriesRepository } from '../../repositories/prisma-categories-repository'

export async function createCategory(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    userId: z.string(),
    name: z.string(),
  })

  const { name, userId } = bodySchema.parse(req.body)

  const categoriesRepository = new PrismaCategoriesRepository()

  try {
    const categoryExists = await categoriesRepository.findByName({
      name,
      userId,
    })
    if (categoryExists) {
      return res.status(400).send({ message: 'Category already exists' })
    }
    const category = await categoriesRepository.create({ name, userId })
    return res.status(201).send(category)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
