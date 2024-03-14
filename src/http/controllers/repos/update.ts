import { z } from 'zod'
import { PrismaReposRepository } from '../../repositories/prisma-repos-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export default async function updateRepo(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string().optional(),
    html_url: z.string().optional(),
    description: z.string().optional(),
    homepage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    categoryId: z.string().optional(),
  })

  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(req.params)

  const { categoryId, description, homepage, html_url, name, tags } =
    bodySchema.parse(req.body)

  const tagsOrDefault = tags || []

  const reposRepository = new PrismaReposRepository()

  try {
    await reposRepository.update({
      id,
      categoryId,
      description,
      homepage,
      html_url,
      name,
      tags: tagsOrDefault,
    })

    return res.status(200).send({ message: 'Repo updated' })
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error updating repo', error: error.message })
  }
}
