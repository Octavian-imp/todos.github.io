import React from "react"
import { useAppDispatch, useAppSelector } from "../../../store/reduxStore"
import TasksFilter from "../TasksFilter"
import styles from "./index.module.scss"
import { clearCompletedTasks } from "../../../store/taskReducer"

const Footer = () => {
  const dispatch = useAppDispatch()
  const counterActive = useAppSelector((state) =>
    state.tasks.reduce((acc, task) => acc + (task.status === "active" ? 1 : 0), 0)
  )

  return (
    <footer className={styles.footer}>
      <span className={styles["todo-count"]}>{counterActive} items left</span>
      <TasksFilter />
      <button className={styles["clear-completed"]} onClick={() => dispatch(clearCompletedTasks())}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
