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
const url = `/api/user/create-post/${id_author}`

describe('POST /api/user/create-post/:id', () => {
  test ('Se espero que el codigo de estado sea un 201', async () => {
    const response = await request(app).post(url).send({
      title, content
    })

    expect(response.statusCode).toBe(201)
  })

  test('se espera que lo enviado sea un object', async () => {
    const response = await request(app).post(url).send({
      title, content
    })

    expect(typeof response.body).toBe('object')
  })

  test('Se espera que lo enviado sea un Content-type application/json', async () => {
    const response = await request(app).post(url).send({
      title, content
    })

    expect(response.headers).toHaveProperty('json')
  })

  test('Se espera que lo enviado no este vacio', async () => {
    const response = await request(app).post(url).send({
      title: '', content: ''
    })

    expect(response.statusCode).toBe(500)
  })

  test('Se espera que el title no este vacio', async () => {
    const response = await request(app).post(url).send({
      title: '', content: 'dasdasda'
    })

    expect(response.statusCode).toBe(500)
  })

  test('Se espera que el content no este vacio', async () => {
    const response = await request(app).post(url).send({
      title: 'dasd', content: ''
    })

    expect(response.statusCode).toBe(500)
  })
})
