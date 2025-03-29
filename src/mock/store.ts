import { Task } from "../store"

const tasks: Array<Omit<Task, "id">> = [
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
    completedAt: undefined,
    durationMin: 1,
  },
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
    completedAt: new Date(2024, 1, 1, 1, 1, 15),
    durationMin: 0.1,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
    completedAt: new Date(2024, 1, 2, 1, 1, 1),
    durationMin: 10,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
    completedAt: new Date(2024, 1, 1, 1, 3, 1),
    durationMin: 10,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
    completedAt: new Date(2024, 1, 1, 1, 15, 1),
    durationMin: 10,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1),
    content: "Test task",
    completedAt: new Date(2024, 2, 1, 1, 1, 1),
    durationMin: 10,
  },
]

const mockTasks = tasks.map((task) => ({
  ...task,
  id: (Math.random() * 1000).toString(36),
}))

export default mockTasks
