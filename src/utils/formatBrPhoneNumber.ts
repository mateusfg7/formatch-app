export function formatBrPhoneNumber(number: string) {
  const cleaned = number.replaceAll(/\D/g, '')
  const phoneLength = cleaned.length

  const ddd = cleaned.slice(0, 2)
  const firstPart = cleaned.slice(2, 7)
  const secondPart = cleaned.slice(7)

  if (phoneLength >= 3 && phoneLength <= 7) {
    if (number === `(${ddd})`) {
      return number
    } else if (number[10] === '-') {
      return `(${ddd}) ${firstPart}-`
    } else {
      return `(${ddd}) ${firstPart}`
    }
  } else if (phoneLength > 6) {
    return `(${ddd}) ${firstPart}-${secondPart}`
  } else {
    return number
  }
}
