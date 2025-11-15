export function isValidName(name: string) {
  return !!name && name.trim().length >= 2
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string) {
  if (!phone) return true
  return /^[+]?\d{7,15}$/.test(phone)
}