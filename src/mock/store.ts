import { Task } from "../store"

const tasks: Array<Omit<Task, "id">> = [
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
  },
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
  },
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
  },
]

const mockTasks = tasks.map((task) => ({
  ...task,
  id: (Math.random() * 1000).toString(36),
}))

export default mockTasks