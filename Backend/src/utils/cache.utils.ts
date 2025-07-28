export const verifyCache = (cache: any): any | null => {
  if (!cache) return null
  try {
    return JSON.parse(cache)
  } catch (error) {
    return null
  }
}

export const saveCache = (data: any) => {
  return {
    value: JSON.stringify(data),
    options: { EX: 60 }
  }
}
