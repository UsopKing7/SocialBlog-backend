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

const title = 'Microsoft saco algo nuevo'
const content = 'microsfot saco una nuva forma de aprender Python'
const id_author = '6de6b4b0-82af-4c20-bd55-797654189478'
const id_post = '9ac9d387-7921-4299-a783-232a7f48f7d9'

const url = `/api/user/create-post/${id_author}`
const urlPacth = `/api/user/${id_author}/update-post/${id_post}`
const urlGetPost = '/api/posts'
const urlGetPostUser = `/api/user/posts/${id_author}`

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

    expect(response.headers['content-type']).toMatch('json')
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


describe('PATCH /user/:id_author/update-post/:id_post', () => {
  test('Se espera que el patch sea un codigo de estado 200', async () => {
    const response = await request(app).patch(urlPacth).send({
      title: 'nwe post', content: 'new content'
    })

    expect(response.statusCode).toBe(200)
  })

  test('Se espera que lo enviado sea un obejeto', async () => {
    const response = await request(app).patch(urlPacth).send({
      title: 'new post', content: 'new content'
    })

    expect(typeof response.body).toBe('object')
  })

  test('Se espera que lo enviado sea un content-type application/json', async () => {
    const response = await request(app).patch(urlPacth).send({
      title: 'new title', content: 'new content'
    })

    expect(response.headers['content-type']).toMatch('json')
  })

  test('Se espera que almenso tenga un title como actualizado', async () => {
    const response = await request(app).patch(urlPacth).send({
      title: '', content: 'new content'
    })

    expect(response.statusCode).toBe(500)
  })

  test('Se espera que almenso tenga un title como actualizado', async () => {
    const response = await request(app).patch(urlPacth).send({
      title: 'new title', content: ''
    })

    expect(response.statusCode).toBe(500)
  })
})

describe('GET /api/posts', () => {
  test('Se espera que el codigo de estado tenga un 200', async () => {
    const response = await request(app).get(urlGetPost)
    expect(response.statusCode).toBe(200)
  })

  test('Se espera que lo ercibido sea un object', async () => {
    const response = await request(app).get(urlGetPost)
    expect(typeof response.body).toBe('object')
  })
})

describe('GET /api/user/posts/:id_author', () => {
  test('Se espera que el codigo de estado tenga un 200', async () => {
    const response = await request(app).get(urlGetPostUser)
    expect(response.statusCode).toBe(200)
  })

  test('Se espera que lo tenga un object', async () => {
    const response = await request(app).get(urlGetPostUser)
    expect(typeof response.body).toBe('object')
  })
})