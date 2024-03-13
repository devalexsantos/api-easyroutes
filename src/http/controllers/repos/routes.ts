import { FastifyInstance } from "fastify";

export async function reposRoutes(app: FastifyInstance) {
  app.get('/repos', async () => {
    return { hello: 'world' }
  })
}