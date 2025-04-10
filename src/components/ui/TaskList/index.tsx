import React from "react"
import { createAppSelector, RootState, useAppSelector } from "../../../store/reduxStore"
import TaskItem from "../Task"
import styles from "./index.module.scss"

const selectFilterTodo = createAppSelector(
  (state: RootState) => state.options.activeFilter,
  (state: RootState) => state.tasks,
  (activeFilter, tasks) => tasks.filter((item) => (activeFilter === "all" ? true : item.status === activeFilter))
)

const TasksList = () => {
  const taskStore = useAppSelector((state) => selectFilterTodo(state))

  return (
    <ul className={styles["todo-list"]}>
      {taskStore.map((task) => (
        <TaskItem key={task.id} currentTime={task.currentDuration} title={task.content} {...task}  />
      ))}
    </ul>
  )
}

export default TasksList
