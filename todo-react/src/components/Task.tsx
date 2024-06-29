import { Task as ITask } from "@/types"
import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { MdOutlineTaskAlt } from "react-icons/md"
import { Checkbox } from "./ui/checkbox"
import { Tooltip } from "react-tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { FcHighPriority, FcMediumPriority, FcLowPriority } from "react-icons/fc"
import { BsThreeDots } from "react-icons/bs"
import { FaPencil, FaTrashCan } from "react-icons/fa6"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface TaskProps {
  task: ITask
  onCheckedChange?: (taskId: string, itemId: string, checked: boolean) => void
}

const Task = (props: TaskProps) => {
  const { task, onCheckedChange } = props

  const priorityColors: Record<ITask["items"][number]["priority"], string> = {
    low: "border-green-500",
    medium: "border-yellow-500",
    high: "border-red-500",
  }

  const priorityIcons: Record<
    ITask["items"][number]["priority"],
    React.ReactNode
  > = {
    low: (
      <>
        <FcLowPriority size={24} />
      </>
    ),
    medium: (
      <>
        <FcMediumPriority size={24} />
      </>
    ),
    high: (
      <>
        <FcHighPriority size={24} />
      </>
    ),
  }

  const allAssignees: ITask["items"][number]["assignees"] = task.items.reduce(
    (assignees: ITask["items"][number]["assignees"], item) => {
      return [...assignees, ...item.assignees]
    },
    []
  )

  return (
    <Dialog>
      <Collapsible className="bg-[#F0D1A8] hover:bg-[#e7bd86] rounded-lg drop-shadow">
        <CollapsibleTrigger className="flex flex-col w-full p-3">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-x-1 text-sm">
              <MdOutlineTaskAlt size={16} />{" "}
              <span>{task.items.length} Tasks</span>{" "}
              <span>
                (
                {task.items.reduce((completedCount, item) => {
                  return item.isCompleted ? completedCount + 1 : completedCount
                }, 0)}
                /{task.items.length} Completed)
              </span>
            </div>
            <div>kek</div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn("bg-[#f4bc73] p-3 rounded-lg rounded-t-none")}
        >
          <div className="flex flex-col gap-y-2">
            {task.items.map((item) => (
              <div
                className={cn(
                  "flex items-center gap-x-1 justify-between w-full bg-[#f0d1a8] p-2 rounded-lg border-2",
                  priorityColors[item.priority]
                )}
                key={item.id}
              >
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    checked={item.isCompleted}
                    className="h-5 w-5"
                    checkClassName="h-4 w-4"
                    onCheckedChange={(checked: boolean) => {
                      onCheckedChange?.(task.id, item.id, checked)
                    }}
                  />
                  <span className={item.isCompleted ? "line-through" : ""}>
                    {item.text}
                  </span>
                  {priorityIcons[item.priority]}
                  <Popover>
                    <PopoverTrigger>
                      <BsThreeDots className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[5rem] p-0">
                      <div className="flex flex-col text-sm">
                        <button className="flex gap-1 items-center border-b-2 hover:rounded-md hover:rounded-b-none hover:bg-gray-200 text-start p-2">
                          <FaPencil />
                          Edit
                        </button>
                        <DialogTrigger
                          className="flex gap-1 items-center hover:bg-gray-200 hover:rounded-md hover:rounded-t-none text-start text-red-500 p-2"
                          onClick={() => {}}
                        >
                          <FaTrashCan />
                          Delete
                        </DialogTrigger>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <div className="flex gap-x-1">
                      {item.assignees.map((assignee, index) => (
                        <img
                          src={assignee.photo}
                          alt={assignee.name}
                          className={`w-7 h-7 border-[2px] border-white rounded-full ${
                            index !== 0 ? "-ml-3" : ""
                          }`}
                          key={assignee.id}
                        />
                      ))}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="w-[40ch] gap-y-3 flex flex-col gap-y-2"
                  >
                    {item.assignees.map((assignee) => (
                      <div
                        className="flex items-center gap-x-1"
                        key={assignee.id}
                      >
                        <img
                          src={assignee.photo}
                          alt={assignee.name}
                          className="w-10 h-10 border-[2px] border-white rounded-full"
                        />
                        <div className="flex flex-col">
                          <span>{assignee.name}</span>
                          <small className="overflow-ellipsis text-xs text-slate-500">
                            {assignee.email}
                          </small>
                        </div>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <DialogContent className="bg-[#f0d1a8] border-none">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Task
