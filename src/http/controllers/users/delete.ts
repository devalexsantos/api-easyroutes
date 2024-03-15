import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'
import { z } from 'zod'

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(req.params)

  const usersRepository = new PrismaUsersRepository()

  try {
    await usersRepository.delete({ id })
    return res.status(200).send({ message: 'User deleted' })
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error deleting user', error: error.message })
  }
}
