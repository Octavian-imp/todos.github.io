import React from "react"
import styles from "./index.module.scss"

const NewTaskForm = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>todos</h1>
      <input
        className={styles["new-todo"]}
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  )
}

export default NewTaskForm
