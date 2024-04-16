import fs from 'node:fs'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { GetFileService } from './get-file'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let service: GetFileService

describe('Get File Service', () => {
  beforeAll(async () => {
    await fs.writeFile('./tmp/uploads/test.jpg', '', {}, () =>
      console.log('CREATED TEST FILE'),
    )
  })

  beforeEach(() => {
    service = new GetFileService()
  })
  it('should be able to fetch a existent file', async () => {
    const { stream } = await service.execute({ filename: 'test.jpg' })
    expect(stream).toBeTruthy()
  })
  it('should not be able to fetch a non existent file', async () => {
    expect(
      async () => await service.execute({ filename: 'file' }),
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
