import { createContext, Dispatch, SetStateAction } from "react"
import mockTasks from "../mock/store"
import { TaskStatus } from "../types/Task"

export type Task = {
  id: string
  status: TaskStatus
  createdAt: Date | undefined
  content: string
  completedAt: Date | undefined
  durationMin: number | undefined
}

type TasksContext = {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

type ActiveFilterContext = {
  active: Omit<TaskStatus, "pause"> | "all"
  setActive: Dispatch<SetStateAction<Omit<TaskStatus, "pause"> | "all">>
}

export const TasksStore = createContext<TasksContext & ActiveFilterContext>({
  tasks: mockTasks,
  setTasks: () => {},
  active: "all",
  setActive: () => {},
})

export default TasksStore
