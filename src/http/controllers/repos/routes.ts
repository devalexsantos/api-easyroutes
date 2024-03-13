import { FastifyInstance } from 'fastify'
import { createRepo } from './create-repo'
import { listAllRepos } from './list-all'

export async function reposRoutes(app: FastifyInstance) {
  app.get('/repos/:owner', listAllRepos)

  app.post('/repos', createRepo)
}
