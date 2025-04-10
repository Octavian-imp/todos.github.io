import { Task } from "../store/taskReducer"


const tasks: Array<Omit<Task, "id">> = [
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    currentDuration: 0,
    durationMin: 1,
  },
  {
    status: "active",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    durationMin: 0.1,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    durationMin: 10,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    durationMin: 10,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    durationMin: 10,
    currentDuration: 0,
  },
  {
    status: "completed",
    createdAt: new Date(2024, 1, 1, 1, 1, 1).getTime(),
    content: "Test task",
    durationMin: 10,
    currentDuration: 0,
  },
]

const mockTasks = tasks.map((task) => ({
  ...task,
  id: (Math.random() * 1000).toString(36),
}))

export default mockTasks
