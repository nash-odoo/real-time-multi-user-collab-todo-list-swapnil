import { Task } from "@/types"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
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
export const signup = async (data: SignupPayload) => {
  const response = await api.post("/auth/signup", data)
  return response.data
}
