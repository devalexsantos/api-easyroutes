import fastify from 'fastify'
import { reposRoutes } from './http/controllers/repos/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { tagsRoutes } from './http/controllers/tags/routes'

export const app = fastify()

app.register(reposRoutes)
app.register(usersRoutes)
app.register(categoriesRoutes)
app.register(tagsRoutes)
