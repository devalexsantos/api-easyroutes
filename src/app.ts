import fastify from 'fastify'
import { reposRoutes } from './http/controllers/repos/routes'

export const app = fastify()

app.register(reposRoutes)
