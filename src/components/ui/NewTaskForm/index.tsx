import React, { KeyboardEvent, useState } from "react"
import { useAppDispatch } from "../../../store/reduxStore"
import { addTask } from "../../../store/taskReducer"
import styles from "./index.module.scss"

const NewTaskForm = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState("")
  const [durationMinValue, setDurationMinValue] = useState<number>(0)
  const [durationSecValue, setDurationSecValue] = useState<number>(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const durationMinRef = React.useRef<HTMLInputElement>(null)
  const durationSecRef = React.useRef<HTMLInputElement>(null)

  function checkAddNewTask(e: KeyboardEvent<HTMLInputElement>) {
    if (typeof durationMinValue === "number" || typeof durationSecValue === "number") {
      if (e.target instanceof HTMLInputElement) {
        const { value } = e.target
        if (value.trim().length === 0 && (durationMinValue === 0 || durationSecValue === 0)) {
          e.stopPropagation()
          return
        }
      }
    }
  }

  function addNewTask(e: KeyboardEvent<HTMLInputElement>) {
    if (
      e.key === "Enter" &&
      (e.target === inputRef.current || e.target === durationMinRef.current || e.target === durationSecRef.current)
    ) {
      const totalDuration = (durationMinValue * 60 + durationSecValue) * 1000
      dispatch(
        addTask({
          id: (Math.random() * 1000).toString(36),
          createdAt: new Date().getTime(),
          status: "active",
          content: value,
          duration: totalDuration,
          currentDuration: 0,
        })
      )
      setValue("")
      setDurationMinValue(0)
      setDurationSecValue(0)
    }
  }

  return (
    <header className={styles.header} onKeyDown={addNewTask}>
      <h1 className={styles.title}>todo</h1>
      <input
        className={styles["new-todo"]}
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={checkAddNewTask}
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        className={styles.duration}
        placeholder="min"
        type="number"
        ref={durationMinRef}
        value={durationMinValue}
        min={0}
        onChange={(e) => setDurationMinValue(Number(e.target.value))}
      />
      <input
        className={styles.duration}
        placeholder="sec"
        type="number"
        ref={durationSecRef}
        value={durationSecValue}
        min={0}
        onChange={(e) => setDurationSecValue(Number(e.target.value))}
      />
    </header>
  )
}

export default NewTaskForm
