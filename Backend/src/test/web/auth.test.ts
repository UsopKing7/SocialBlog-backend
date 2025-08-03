import { describe, test, expect } from '@jest/globals'
import { server } from '../../server'
import request from 'supertest'

// ===> Test par la ruta /api/login
describe('POST /api/login', () => {
  test('Se espera que el codigo de estado sea un 200', async () => {
    const response = await request(server).post('/api/login').send({
      email: 'nicolasguarachi888@gmail.com',
      password: 'Nicolas-9090'
    })
    expect(response.statusCode).toBe(200)
  })
})

// ===> Test para la ruta /api/register