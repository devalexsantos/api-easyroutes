import { FastifyInstance } from 'fastify'
import { createTags } from './create'
import { listAllTags } from './list-all'
import { updateTags } from './update'
import { deleteTags } from './delete'

export async function tagsRoutes(app: FastifyInstance) {
  app.get('/tags/:userId', listAllTags)

  app.post('/tags', createTags)

  app.post('/tags/:tagId', updateTags)

  app.delete('/tags/delete/:tagId', deleteTags)
}
