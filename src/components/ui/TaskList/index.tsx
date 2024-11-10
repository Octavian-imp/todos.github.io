import React, { useContext, useEffect, useState } from "react"
import TasksStore, { Task } from "../../../store"
import TaskItem from "../Task"
import styles from "./index.module.scss"

const TasksList = () => {
  const { tasks: tasksContext, active: activeFilter } = useContext(TasksStore)
  const [tasksList, setTasksList] = useState<Task[]>(tasksContext)

  useEffect(() => {
    setTasksList(
      tasksContext.filter((item) => {
        if (activeFilter === "all") return true
        else {
          if (activeFilter === item.status) return true
          else return false
        }
      })
    )
  }, [activeFilter, tasksContext])

  return (
    <ul className={styles["todo-list"]}>
      {tasksList.map((task) => (
        <TaskItem
          key={task.id}
          createdAt={task.createdAt}
          status={task.status}
          id={task.id}
        >
          {task.content}
        </TaskItem>
      ))}
    </ul>
  )
}

export default TasksList
