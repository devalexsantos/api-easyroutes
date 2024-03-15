import { FastifyInstance } from 'fastify'
import { listAllCategories } from './list-all'
import { createCategory } from './create'
import { updateCategory } from './update'
import { deleteCategory } from './delete'

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/categories/:userId', listAllCategories)

  app.post('/categories', createCategory)

  app.post('/categories/:categoryId', updateCategory)

  app.delete('/categories/delete/:categoryId', deleteCategory)
}
