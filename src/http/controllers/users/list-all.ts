import { FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'

export async function listAllUsers(_, res: FastifyReply) {
  const usersRepository = new PrismaUsersRepository()

  try {
    const users = await usersRepository.listAll()
    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
