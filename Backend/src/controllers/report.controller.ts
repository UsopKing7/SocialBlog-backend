import { Request, Response } from 'express'
import { reportValidation } from '../validation/report.validation'
import { formatError } from '../utils/error.utils'
import { validatioBody } from '../utils/validation.utils'
import { commentReport } from '../reports/comment.report'
import { saveCache, verifyCache } from '../utils/cache.utils'
import { redis } from '../config/redis'

export const createRepor = async (req: Request, res: Response) => {
  try {
    const { id_reporter, id_comment } = req.params
    if (!id_reporter || !id_comment) throw new Error ('Error al encontrar el Ids')
    
    const response = reportValidation.safeParse(req.body)
    if (!response.success) throw new Error (validatioBody(response))

    const { reason } = response.data
    const report = await commentReport.createReport({
      id_comment, id_reporter, reason
    })

    await Promise.all([
      redis.del(`reportes:${id_reporter}`)
    ])

    res.status(201).json({
      message: 'reporte creado',
      report
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const reportes = async (req: Request, res: Response) => {
  try {
    const { id_reporter } = req.params
    if (!id_reporter) throw new Error ('Error al encontrar el Id')

    const key = `reportes:${id_reporter}`
    const cache = await redis.get(key)

    const reportesCache = verifyCache(cache)
    if (reportesCache !== null) {
      res.status(200).json({
        message: 'Reportes de los comentarios (cache)',
        reportes: reportesCache
      })
      return
    }
    
    const reportes = await commentReport.reportsAll(id_reporter)
    const { options, value } = saveCache(reportes)

    await redis.set(key, value, options)
    res.status(200).json({
      message: 'Reportes de los comentarios',
      reportes
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}
