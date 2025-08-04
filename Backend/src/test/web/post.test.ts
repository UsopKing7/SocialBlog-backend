import { describe, test, expect, jest } from '@jest/globals'
import { app } from '../../server'
import request from 'supertest'

jest.mock('../../config/redis', () => ({
  redis: {
    del: jest.fn()
  }
}))

const title = 'Microsoft saco algo nuevo'
const content = 'microsfot saco una nuva forma de aprender Python'
const id_author = '6de6b4b0-82af-4c20-bd55-797654189478'

describe('POST /api/user/create-post/:id', () => {
  test ('Se espero que el codigo de estado sea un 201', async () => {
    const response = await request(app).post(`/api/user/create-post/${id_author}`).send({
      title, content
    })

    expect(response.statusCode).toBe(201)
  })
})
