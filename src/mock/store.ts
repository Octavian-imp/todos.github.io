import { Task } from "../store/taskReducer"

const tasks: Array<Omit<Task, "id">> = [
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    currentDuration: 0,
    duration: 60_000,
  },
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    duration: 6000,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    duration: 600_000,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    duration: 600_000,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    duration: 600_000,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    duration: 600_000,
    currentDuration: 0,
  },
]

const mockTasks = tasks.map((task) => ({
  ...task,
  id: (Math.random() * 1000).toString(36),
}))

export default mockTasks
