import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'

export async function createUserWithClear(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    data: z.object({
      id: z.string(),
    }),
  })

  const { data } = bodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()

  try {
    const user = await usersRepository.create(data)
    return res.status(201).send({ message: 'User created', user })
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error creating repo', error: error.message })
  }
}
