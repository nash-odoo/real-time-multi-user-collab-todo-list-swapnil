import { create } from "zustand"

interface AuthStore {
  isAuth: boolean
  token: string
  checkAuth: () => void
  setToken: (token: string) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  token: "",
  checkAuth: () => {
    const token = localStorage.getItem("token")
    set({ isAuth: !!token, token: token ?? "" })
  },
  setToken: (token) => {
    localStorage.setItem("token", token)
    set({ isAuth: true, token })
  },
}))

// NOTE: Unable to implement due to lack of time
