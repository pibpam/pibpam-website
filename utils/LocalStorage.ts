import { ISavedRegistration } from '../interfaces/Event'

const KEY = '@pibpam:'

const TOKEN = `${KEY}keyAccess`
const REGISTRATIONS = `${KEY}registrations`

export const saveToken = (accessToken: string) => {
  localStorage.setItem(TOKEN, accessToken)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN)
}

export const getSavedRegistrations = (): ISavedRegistration[] => {
  try {
    const raw = localStorage.getItem(REGISTRATIONS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Grava/atualiza uma inscrição na lista local (dedup por código, mais recente primeiro).
export const saveRegistration = (entry: ISavedRegistration) => {
  const current = getSavedRegistrations().filter((r) => r.code !== entry.code)
  const updated = [entry, ...current]
  localStorage.setItem(REGISTRATIONS, JSON.stringify(updated))
  return updated
}