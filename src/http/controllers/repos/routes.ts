import { FastifyInstance } from 'fastify'
import { createRepo } from './create-repo'
import { listAllRepos } from './list-all'
import updateRepo from './update'
import deleteRepo from './delete'

export async function reposRoutes(app: FastifyInstance) {
  app.get('/repos/:owner', listAllRepos)

  app.post('/repos', createRepo)
  app.post('/repos/:id', updateRepo)

  app.delete('/repos/delete/:id', deleteRepo)
}
