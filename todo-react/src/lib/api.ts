import { Task } from "@/types"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers["Authorization"] = `Token ${token}`
  }
  return config
})

interface CreateTaskPayload {
  name: string
  description: string
  task_items: Array<Pick<Task["items"][number], "priority" | "text">>
}

export const createTask = async (task: CreateTaskPayload) => {
  const response = await api.post("/tasks", task)
  return response.data
}

interface SignupPayload {
  first_name: string
  last_name: string
  email: string
  password1: string
  password2: string
}
export const signup = async (data: SignupPayload): Promise<{ key: string }> => {
  const response = await api.post("/auth/signup/", data)
  localStorage.setItem("token", response.data.key)
  return response.data
}

export const login = async (payload: { email: string; password: string }) => {
  const response = await api.post("/auth/login/", payload)
  localStorage.setItem("token", response.data.key)
  return response.data
}

export const getMe = async () => {
  const response = await api.get("/user/me/")
  return response.data
}
