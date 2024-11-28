export const extractId = (cookie) => {
  const match = cookie.match(/j:"([^"]+)"/)
  return match ? match[1] : null
}
