import { createContext, Dispatch, SetStateAction } from "react"
import mockTasks from "../mock/store"
import { TaskStatus } from "../types/Task"

export type Task = {
  id: string
  status: TaskStatus
  createdAt: Date
  content: string
}

type TasksContext = {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

type ActiveFilterContext = {
  active: TaskStatus | "all"
  setActive: Dispatch<SetStateAction<TaskStatus | "all">>
}

export const TasksStore = createContext<TasksContext & ActiveFilterContext>({
  tasks: mockTasks,
  setTasks: () => {},
  active: "all",
  setActive: () => {},
})

export default TasksStore
