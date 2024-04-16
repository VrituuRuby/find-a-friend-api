import fs from 'node:fs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetFileRequestParams {
  filename: string
}

interface GetFileResponse {
  stream: fs.ReadStream
}

export class GetFileService {
  async execute({ filename }: GetFileRequestParams): Promise<GetFileResponse> {
    const filePath = `./tmp/uploads/${filename}`
    const fileExists = await fs.promises
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)

    if (fileExists) {
      const stream = fs.createReadStream(filePath)

      return { stream }
    } else {
      throw new ResourceNotFoundError()
    }
  }
}
