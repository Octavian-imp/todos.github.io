import cn from "clsx"
import { formatDistanceStrict, formatDuration } from "date-fns"
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { useOutsideClick } from "../../../libs/hooks/useOutsideClick"
import TasksStore from "../../../store"
import { TaskStatus } from "../../../types/Task"
import styles from "./index.module.scss"

type Props = {
  status: TaskStatus
  id: string
  createdAt: Date | undefined
  completedAt: Date | undefined
  title: string
  durationMin: number
}

const Task = ({ status, durationMin, id, createdAt, completedAt, title }: Props) => {
  const { tasks, setTasks, active: activeFilter } = useContext(TasksStore)

  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState<string>(tasks.find((task) => task.id === id)?.content || "")

  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(
    completedAt ? (completedAt.getTime() - createdAt!.getTime()) / 1000 : 0
  )
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const taskInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isRunning && status === "active") {
      console.log("effect stop")
      onStop()
    }

    if (status === "pause" && !isRunning) {
      console.log("effect start")
      onStart()
    }
  }, [activeFilter])

  function onSave() {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, content: taskInputRef.current?.value || "" }
        }
        return task
      })
    )
    setIsEdit(false)
  }

  function intervalCallback() {
    setCurrentTime((prev) => {
      const newVal = prev + 1
      return newVal
    })

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: "active" }
        }
        return task
      })
    )
  }

  function onStart() {
    const id = window.setInterval(intervalCallback, 1000)
    setIsRunning(true)
    setIntervalId(id)
  }

  function onStop() {
    if (intervalId === null) return
    clearInterval(intervalId)
    setIsRunning(false)
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, completedAt: new Date(task.createdAt!.getTime() + currentTime * 1000), status: "pause" }
        }
        return task
      })
    )
  }

  useOutsideClick({
    elementRef: taskInputRef,
    onOutsideClick: onSave,
    enabled: isEdit,
  })

  function onDestroy() {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function changeStatus(e: ChangeEvent<HTMLInputElement>) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: e.target.checked ? "completed" : "active",
          }
        }
        return item
      })
    )
  }

  return (
    <li className={cn({ [styles.editing]: isEdit }, { [styles.completed]: status === "completed" })}>
      <div className={styles.view}>
        <input className={styles.toggle} type="checkbox" checked={status === "completed"} onChange={changeStatus} />
        <label className={styles.label}>
          <span className={styles.description}>{title}</span>
        </label>
        <div className={styles.actions}>
          {isRunning ? (
            <Task.activeTimer currentTime={currentTime} onStop={onStop} />
          ) : (
            <Task.disabledTimer
              status={status}
              completedAt={completedAt}
              createdAt={createdAt}
              setIsEdit={setIsEdit}
              onStart={onStart}
              onDestroy={onDestroy}
              durationMin={durationMin}
            />
          )}
        </div>
      </div>
      {isEdit && (
        <input
          type="text"
          className={styles.edit}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          ref={taskInputRef}
        />
      )}
    </li>
  )
}

type DisabledTimerProps = {
  status: TaskStatus
  completedAt: Date | undefined
  createdAt: Date | undefined
  setIsEdit: Dispatch<SetStateAction<boolean>>
  onStart: () => void
  onDestroy: () => void
  durationMin: number
}

Task.disabledTimer = ({
  completedAt,
  createdAt,
  status,
  setIsEdit,
  onStart,
  onDestroy,
  durationMin,
}: DisabledTimerProps) => {
  return (
    <>
      <span className={styles.duration}>
        {typeof completedAt === "undefined" || typeof createdAt === "undefined"
          ? formatDuration({ minutes: durationMin })
          : formatDistanceStrict(createdAt, completedAt)}
      </span>
      {status === "pause" || status === "active" ? (
        <button type="button" className={cn(styles["icon-start"], styles.active)} onClick={onStart}></button>
      ) : null}
      <button className={cn(styles.icon, styles["icon-edit"])} onClick={() => setIsEdit((prev) => !prev)}></button>
      <button className={cn(styles.icon, styles["icon-destroy"])} onClick={onDestroy}></button>
    </>
  )
}

type ActiveTimerProps = {
  onStop: () => void
  currentTime: number
}

Task.activeTimer = function ({ currentTime, onStop }: ActiveTimerProps) {
  return (
    <>
      <span className={styles.duration}>{currentTime} secs</span>
      <button onClick={onStop} className={styles["icon-stop"]}></button>
    </>
  )
}

export default Task
