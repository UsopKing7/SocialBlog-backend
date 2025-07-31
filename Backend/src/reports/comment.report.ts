import { commentRepository } from "../repositories/comment.repository"
import { reportRepository } from "../repositories/report.repository"
import { userRepository } from "../repositories/user.repository"
import { reportCreateDb } from '../types/repo.type'

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
  }
}
