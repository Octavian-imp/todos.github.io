import React, { useContext, useEffect, useState } from "react"
import TasksStore from "../../../store"
import TasksFilter from "../TasksFilter"
import styles from "./index.module.scss"

const Footer = () => {
  const { setTasks, tasks } = useContext(TasksStore)
  const [counterItems, setCounterItems] = useState(
    tasks.reduce((acc, curr) => {
      if (curr.status === "active") return acc + 1
      else return acc
    }, 0)
  )

  useEffect(() => {
    setCounterItems(
      tasks.reduce((acc, curr) => {
        if (curr.status === "active") return acc + 1
        else return acc
      }, 0)
    )
  }, [tasks])

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => task.status !== "completed"))
  }

  return (
    <footer className={styles.footer}>
      <span className={styles["todo-count"]}>{counterItems} items left</span>
      <TasksFilter />
      <button className={styles["clear-completed"]} onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
