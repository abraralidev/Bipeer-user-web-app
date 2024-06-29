export const setToken = (token: string) => localStorage.setItem("token", token)

export const getToken = () => localStorage.getItem("token")

export const deleteToken = () => localStorage.removeItem("token")