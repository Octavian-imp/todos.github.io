import React, { KeyboardEvent, useContext, useState } from "react"
import TasksStore from "../../../store"
import styles from "./index.module.scss"

const NewTaskForm = () => {
  const { setTasks } = useContext(TasksStore)
  const [value, setValue] = useState("")
  const [durationValue, setDurationValue] = useState<number>()

  function checkAddNewTask(e: KeyboardEvent<HTMLInputElement>) {
    if (e.target instanceof HTMLInputElement) {
      const { value } = e.target
      if (e.key === "Enter") {
        setTasks((prev) => {
          return [
            {
              id: (Math.random() * 1000).toString(36),
              createdAt: new Date(),
              status: "active",
              content: value,
              completedAt: undefined,
              durationMin: durationValue,
            },

            ...prev,
          ]
        })
        setValue("")
      }
    }
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>todo</h1>
      <input
        className={styles["new-todo"]}
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={checkAddNewTask}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        className={styles.duration}
        placeholder="Duration in minutes"
        type="number"
        value={durationValue}
        onChange={(e) => setDurationValue(Number(e.target.value))}
      />
    </header>
  )
}

export default NewTaskForm
