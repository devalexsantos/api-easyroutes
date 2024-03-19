import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { reposRoutes } from './http/controllers/repos/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { tagsRoutes } from './http/controllers/tags/routes'

export const app = fastify()

const TOKEN_SECRET = process.env.TOKEN_SECRET

const validateToken = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization

  if (token !== `Bearer ${TOKEN_SECRET}`) {
    reply.code(401).send('Unauthorized')
  }
}

app.addHook('preHandler', validateToken)

app.register(reposRoutes)
app.register(usersRoutes)
app.register(categoriesRoutes)
app.register(tagsRoutes)
