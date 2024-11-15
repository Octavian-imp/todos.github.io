import { TaskStatus } from "../types/Task"

export type FilterName = TaskStatus | "all"

const filters: Array<FilterName> = ["all", "active", "completed"]

const filterTodos = filters.map((filter) => ({
  name: filter,
  id: (Math.random() * 1000).toString(36),
}))
export default filterTodos
