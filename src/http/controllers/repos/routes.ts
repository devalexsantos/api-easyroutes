import { FastifyInstance } from 'fastify'
import { createRepo } from './create-repo'

export async function reposRoutes(app: FastifyInstance) {
  app.post('/repos', createRepo)
}
