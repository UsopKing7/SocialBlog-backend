import { prisma } from '../config/db'
import { deleteCommentForReport, reportCreateDb, updateStateRepot } from '../types/repo.type'

export const reportRepository = {
  create: async (data: reportCreateDb) => {
    return await prisma.report.create({ data })
  },

  getAllReports: async (id_reporter: string) => {
    return await prisma.report.findMany({
      where: { id_reporter }
    })
  },

  updateStateReport: async (data: updateStateRepot) => {
    return await prisma.report.update({
      where: {
        id_report: data.id_report
      }, data: {
        status: 'REVIEWED'
      }
    })
  },

  findReport: async (id_report: string) => {
    return await prisma.report.findUnique({
      where: { id_report }
    })
  },
  
  updateStateReportDel: async (data: deleteCommentForReport) => {
    return await prisma.report.update({
      where: {
        id_report: data.id_report
      }, data: {
        status: 'DISMISSED'
      }
    })
  },

  deleteReport: async (id_report: string) => {
    return await prisma.report.delete({
      where: { id_report }
    })
  }
}
