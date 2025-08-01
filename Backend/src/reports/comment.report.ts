import { commentRepository } from "../repositories/comment.repository"
import { reportRepository } from "../repositories/report.repository"
import { userRepository } from "../repositories/user.repository"
import { deleteCommentForReport, reportCreateDb, updateStateRepot } from '../types/repo.type'

export const commentReport = {
  createReport: async (data: reportCreateDb) => {
    const { id_comment, id_reporter, reason } = data
    const user = await userRepository.findIdUser(data.id_reporter)
    if (!user) throw new Error ('Error al encontrar el usuario')

    const comment = await commentRepository.findComment(data.id_comment)
    if (!comment) throw new Error ('Error al encontrar el comment')

    const report = await reportRepository.create({ id_comment, id_reporter, reason })

    return report
  },

  reportsAll: async (id_reporter: string) => {
    const reports = await reportRepository.getAllReports(id_reporter)
    if (!reports) throw new Error ('Error al encontrar los reportes')
    
    return reports
  },

  updateStatusReport: async (data: updateStateRepot) => {
    const { id_comment, id_reporter, id_report } = data

    const user = await userRepository.findIdUser(id_reporter)
    if (!user) throw new Error ('Error al encontrar el user')

    const report = await reportRepository.findReport(id_report)
    if (!report) throw new Error ('Error al encontrar el reporte')

    const comment = await commentRepository.findComment(id_comment)
    if (!comment) throw new Error ('Error al encontrar el comment')

    const estado = await reportRepository.updateStateReport({
      id_comment, id_report, id_reporter
    })

    return estado
  },

  updateStatusReportDel: async (data: deleteCommentForReport) => {
    const { id_comment, id_report, id_reporter } = data

    const user = await userRepository.findIdUser(id_reporter)
    if (!user) throw new Error ('Error al encontrar el User')

    const reporte = await reportRepository.findReport(id_report)
    if (!reporte) throw new Error ('Error al encontrar el Reporte')

    const comment = await commentRepository.findComment(id_comment)
    if (!comment) throw new Error ('Error al encontrar el Comment')

    await reportRepository.updateStateReportDel({ id_comment, id_report, id_reporter })
    await reportRepository.deleteReport(id_report)
    const commentDelete = await commentRepository.deleteCommentReporte(id_comment)

    return commentDelete
  }
}
