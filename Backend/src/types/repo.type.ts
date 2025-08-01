export interface reportCreateDb {
  id_comment: string
  id_reporter: string
  reason: string
}

export interface updateStateRepot {
  id_report: string
  id_reporter: string
  id_comment: string
}

export interface deleteCommentForReport {
  id_comment: string
  id_report: string
  id_reporter: string
}
