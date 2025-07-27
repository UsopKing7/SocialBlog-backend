export const validatioBody = (response: any): string => {
  if (response?.error?.issues) {
    return response.error.issues.map((e: any) => e.message).join(', ')
  }
  return ' '
}
