import { describe, test, expect, jest } from '@jest/globals'
import { app } from '../../server'
import request from 'supertest'

jest.mock('../../config/redis', () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn()
  },
}))

const content = 'este es el comment en el test jest'

const id_author = '6de6b4b0-82af-4c20-bd55-797654189478'
const id_post = '9ac9d387-7921-4299-a783-232a7f48f7d9'
const id_comment = 'c6d56e35-d69f-44e9-aecc-0f6a2cbdb005'

const urlPost = `/api/user/${id_author}/post/${id_post}/create-comment`
const urlPacth = `/api/user/${id_author}/post/${id_post}/comment/${id_comment}/update-comment`
const urlGet = `/api/posts/comments/${id_post}`

describe('POST /api/user/:id_author/post/:id_post/create-comment', () => {
  test('Se espera que el codigo de estado sea un 201', async () => {
    const response = await request(app).post(urlPost).send({
      content
    })

    expect(response.statusCode).toBe(201)
  })

  test('Se espera que lo enviado sea un object', async () => {
    const response = await request(app).post(urlPost).send({
      content
    })

    expect(typeof response.body).toBe('object')
  })

  test('Se espera que lo enviado tenga un content-type application/json', async () => {
    const response = await request(app).post(urlPost).send({
      content
    })

    expect(response.headers['content-type']).toMatch('json')
  })

  test('Se espera que el content no este vacio', async () => {
    const response = await request(app).post(urlPost).send({
      content: ''
    })

    expect(response.statusCode).toBe(500)
  })
})

describe('PATCH /api/user/:id_author/post/:id_post/comment/:id_comment/update-comment', () => {
  test('Se espera que lo actualizado sea un codigo de estado 200', async () => {
    const response = await request(app).patch(urlPacth).send({
      content: 'new comment update'
    })

    expect(response.statusCode).toBe(200)
  })

  test('Se espera que el content no este vacio', async () => {
    const response = await request(app).patch(urlPacth).send({
      content: ''
    })

    expect(response.statusCode).toBe(500)
  })
  test('Se espera que lo enviado sea un object', async () => {
    const response = await request(app).patch(urlPacth).send({
      content: 'new comment update'
    })

    expect(typeof response.body).toBe('object')
  })

  test('Se espera que lo enviado tenga un content-type application/json', async () => {
    const response = await request(app).patch(urlPacth).send({
      content: 'new comment update'
    })

    expect(response.headers['content-type']).toMatch('json')
  })
})

describe('GET /api/post/comments/:id_post', () => {
  test('Se espera que lo recivido sea un codigo de estado 200', async () => {
    const response = await request(app).get(urlGet)
    expect(response.statusCode).toBe(200)
  })

  test('Se espear que lo recivido sea un objeto', async () => {
    const response = await request(app).get(urlGet)
    expect(typeof response.body).toMatch('object')
  })
})
