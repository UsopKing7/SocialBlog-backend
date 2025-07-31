import { prisma } from '../config/db'
import { reportCreateDb } from '../types/repo.type'

export const reportRepository = {
  create: async (data: reportCreateDb) => {
    return await prisma.report.create({ data })
  },

  getAllReports: async (id_reporter: string) => {
    return await prisma.report.findMany({
      where: { id_reporter }
    })
  }
}
