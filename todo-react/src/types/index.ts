export interface Task {
  id: string
  title: string
  items: {
    id: string
    isCompleted: boolean
    text: string
    priority: "low" | "medium" | "high"
    assignees: {
      id: string
      name: string
      photo: string
      email: string
    }[]
  }[]
}
