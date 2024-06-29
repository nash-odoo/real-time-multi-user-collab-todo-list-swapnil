import React from "react"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Task as ITask } from "@/types"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Button } from "./ui/button"
import { FaCirclePlus, FaPlus, FaTrash } from "react-icons/fa6"
import { Checkbox } from "./ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const formSchema = z.object({
  title: z.string().min(2),
  items: z.array(
    z.object({
      isCompleted: z.boolean(),
      text: z.string().min(2),
      assignees: z
        .array(
          z.object({
            id: z.string(),
            name: z.string(),
            photo: z.string(),
          })
        )
        .min(0),
    })
  ),
})
interface CreateTaskProps {
  onCreate: (data: ITask) => void
}

const CreateTask = (props: CreateTaskProps) => {
  const { onCreate } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      items: [{ isCompleted: false, text: "", assignees: [] }],
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    onCreate({
      id: Math.random().toString(36).substring(7),
      items: data.items.map((item) => ({
        ...item,
        isCompleted: item.isCompleted,
        priority: "medium",
        id: Math.random().toString(36).substring(7),
        text: item.text,
        assignees: item.assignees.map((assignee) => ({
          id: assignee.id,
          name: assignee.name,
          photo: 'https://randomuser.me/api/portraits/thumb/women/88.jpg'
        }),
      })),
      title: data.title,
    })
  }

  console.log(form.getValues())

  return (
    <div className="w-full flex flex-row flex-grow gap-3 py-8">
      <Form {...form}>
        <form
          className="flex flex-grow gap-x-4 items-start h-min w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="max-w-[18rem] w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Task Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col gap-y-2">
            {form.watch("items").map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`items.${index}.text`}
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel>Task #{index + 1}</FormLabel>
                    <div className="flex gap-x-1 items-center !mt-0">
                      <FormControl className="flex items-center gap-2">
                        <Checkbox
                          className="w-8 h-8"
                          onCheckedChange={(isChecked: boolean) => {
                            form.setValue(
                              `items.${index}.isCompleted`,
                              isChecked
                            )
                          }}
                          {...form.register(`items.${index}.isCompleted`)}
                        />
                      </FormControl>
                      <FormControl>
                        <Input {...field} placeholder="Task Description" />
                      </FormControl>
                    </div>
                    <FormDescription className="w-full flex justify-between items-center">
                      <span>Task Description</span>
                      <div className="flex items-center gap-2 text-sm">
                        {form.getValues("items").length !== 1 ? (
                          <button
                            className="hover:text-red-500"
                            title="Delete Task"
                            type="button"
                            onClick={() => {
                              form.setValue(
                                "items",
                                form
                                  .getValues("items")
                                  .filter((_, i) => i !== index)
                              )
                            }}
                          >
                            <FaTrash />
                          </button>
                        ) : null}
                        <Popover>
                          <PopoverTrigger>
                            <button
                              type="button"
                              className="flex items-center gap-1 text-sm hover:text-blue-500"
                            >
                              <FaCirclePlus /> Add Assignees
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="end"
                            className="flex text-xs flex-col gap-1"
                          >
                            <small></small>
                            <Input placeholder="Search Name or Email" />
                            <div className="flex flex-col gap-y-1 max-h-32 overflow-y-auto">
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                              <span>asdasd</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="group">
              <button
                type="button"
                className="border-4 border-dashed border-slate-400 rounded-md flex flex-col justify-center items-center h-14 w-full group-hover:border-slate-500"
                onClick={() => {
                  form.setValue("items", [
                    ...form.getValues("items"),
                    { isCompleted: false, text: "", assignees: [] },
                  ])
                }}
              >
                <FaPlus
                  size={24}
                  className="text-slate-400 group-hover:text-slate-500"
                />
              </button>
            </div>
          </div>

          <Button type="submit" className="mt-[1.8rem]" variant={"green"}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateTask
