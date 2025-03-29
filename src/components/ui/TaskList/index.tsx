import React, { useContext, useEffect, useRef, useState } from "react"
import TasksStore, { Task } from "../../../store"
import TaskItem from "../Task"
import styles from "./index.module.scss"

const TasksList = () => {
  const { tasks: tasksContext, active: activeFilter, setTasks: setTasksContext } = useContext(TasksStore)
  const [tasksList, setTasksList] = useState<Task[]>(tasksContext)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTasksContext((prev) => [...prev])
    }, 10_000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <ul className={styles["todo-list"]}>
      {tasksList.map((task) => (
        <TaskItem
          key={task.id}
          completedAt={task.completedAt}
          durationMin={task.durationMin}
          title={task.content}
          createdAt={task.createdAt}
          status={task.status}
          id={task.id}
        />
      ))}
    </ul>
  )
}

export default TasksList
