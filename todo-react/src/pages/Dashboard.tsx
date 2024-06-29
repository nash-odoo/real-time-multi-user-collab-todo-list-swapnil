import CreateTask from "@/components/CreateTask"
import Task from "@/components/Task"
import { Task as ITask, Task } from "@/types"
import { ApiResponse } from "@/types/randomuser"
import { useState } from "react"
import { useAsyncEffect } from "rooks"

const Dashboard = () => {
  const [tasks, setTasks] = useState<ITask[]>([])

  const generateRandomTask = async () => {
    const url =
      "https://randomuser.me/api/?inc=picture,name,email,login&results=10&nat=IN"
    const response = await fetch(url)
    const data = (await response.json()) as ApiResponse
    const priorities: ITask["items"][number]["priority"][] = [
      "high",
      "low",
      "medium",
    ]
    /**
     * generate 10 random tasks with 1-5 random items and 1-5 random assignees
     */
    const randomTasks = Array.from({ length: 10 }, (_, i) => {
      const pickRandomUserCount = Math.floor(Math.random() * 5) + 1
      const randaomItemCount = Math.floor(Math.random() * 5) + 1
      const task: ITask = {
        id: Math.random().toString(36).substring(7),
        title: "Some task Title",
        items: [
          ...Array.from({ length: randaomItemCount }, (_, i) => ({
            id: Math.random().toString(36).substring(7),
            isCompleted: Math.random() > 0.5,
            text: "Some task item text",
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            assignees: [
              ...Array(pickRandomUserCount)
                .fill(0)
                .map(() => {
                  return {
                    id: data.results[
                      Math.floor(Math.random() * data.results.length)
                    ].login.uuid,
                    name: data.results[
                      Math.floor(Math.random() * data.results.length)
                    ].name.first,
                    email:
                      data.results[
                        Math.floor(Math.random() * data.results.length)
                      ].email,
                    photo:
                      data.results[
                        Math.floor(Math.random() * data.results.length)
                      ].picture.thumbnail,
                  }
                }),
            ],
          })),
        ],
      }

      return task
    })

    return randomTasks
  }

  useAsyncEffect(async () => {
    const newTasks = await generateRandomTask()
    console.log(newTasks)
    setTasks([...tasks, ...newTasks])
  }, [])

  return (
    <div className="bg-slate-100 flex-grow flex flex-col w-full">
      <div className="m-6 p-4 bg-[#FAF7F2] rounded-lg text-center ">
        <div className="flex flex-wrap text-white p-3">
          <CreateTask
            onCreate={(task: ITask) => {
              setTasks([...tasks, task])
            }}
          />

          <div className="w-full flex flex-col gap-y-2 text-black">
            {tasks.map((task) => (
              <Task
                task={task}
                onCheckedChange={(taskId, itemid, checked) => {
                  const newTasks = tasks.map((t) => {
                    if (t.id === taskId) {
                      t.items = t.items.map((item) => {
                        if (item.id === itemid) {
                          item.isCompleted = checked
                        }
                        return item
                      })
                    }
                    return t
                  })
                  setTasks(newTasks)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
