const KEY = '@pibpam:'

const TOKEN = `${KEY}keyAccess`

export const saveToken = (accessToken: string) => {
  localStorage.setItem(TOKEN, accessToken)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}