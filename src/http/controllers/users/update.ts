import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'
import { z } from 'zod'

export async function updateUsers(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
  })

  const bodySchema = z.object({
    premium: z.boolean(),
  })

  const { userId } = paramsSchema.parse(req.params)
  const { premium } = bodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()

  try {
    const user = await usersRepository.update({ userId, premium })

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}
