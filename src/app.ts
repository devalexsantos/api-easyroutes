import fastify from 'fastify'
import { reposRoutes } from './http/controllers/repos/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(reposRoutes)
app.register(usersRoutes)
