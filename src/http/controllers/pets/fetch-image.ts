import { FastifyReply, FastifyRequest } from 'fastify'
import { GetFileService } from '../../../services/get-file'

interface FetchImageParams {
  filename: string
}

export async function fetchImageHandle(
  request: FastifyRequest<{ Params: FetchImageParams }>,
  reply: FastifyReply,
) {
  const { filename } = request.params
  const getFileService = new GetFileService()
  try {
    const { stream } = await getFileService.execute({ filename })
    reply.header('Content-Type', 'image/png')
    reply.header('Cache-Control', 'public, max-age=86400') // Cache de 1 dia

    return stream
  } catch (error) {
    return reply.status(404).send({ message: 'file not found' })
  }
}
