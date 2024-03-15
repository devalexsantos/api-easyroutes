import { FastifyInstance } from 'fastify'
import { createUser } from './create'
import { listAllUsers } from './list-all'
import { deleteUser } from './delete'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', listAllUsers)

  app.post('/users', createUser)

  app.delete('/users/delete/:id', deleteUser)
}
