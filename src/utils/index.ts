export function trimText(data: any) {
  if (data === null || data === undefined) {
    return data
  }
  return JSON.parse(JSON.stringify(data), (_key, value) => (typeof value === 'string' ? value.trim() : value))
}
