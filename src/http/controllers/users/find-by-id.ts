import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'
import { z } from 'zod'

export async function findUserById(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = paramsSchema.parse(req.params)

  const usersRepository = new PrismaUsersRepository()

  try {
    const user = await usersRepository.findUserById({ userId })
    return res.status(200).send({ message: 'User found', user })
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error finding user', error: error.message })
  }
}
