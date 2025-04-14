import cn from "clsx"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useOutsideClick } from "../../../libs/hooks/useOutsideClick"
import { useAppDispatch } from "../../../store/reduxStore"
import { addTimeTask, changeTaskStatus, editTask, removeTask, setIntervalTaskRef } from "../../../store/taskReducer"
import { TaskStatus } from "../../../types/Task"
import styles from "./index.module.scss"
import { lightFormat } from "date-fns"

type Props = {
  status: TaskStatus
  id: string
  currentTime: number
  title: string
  duration: number
  intervalRef?: NodeJS.Timeout
}

const Task = ({ status, duration, id, intervalRef: storeIntervalRef, currentTime, title }: Props) => {
  const dispatch = useAppDispatch()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editValue, setEditValue] = useState<string>(title)
  const [isRunning, setIsRunning] = useState<boolean>(storeIntervalRef ? true : false)
  const intervalRef = useRef<NodeJS.Timeout>()

  function changeStatus() {
    // смена статуса
    dispatch(changeTaskStatus({ id, status: status === "active" ? "completed" : "active" }))
  }

  useEffect(() => {
    // отключаем таймер и меняем статус если время закончилось
    if (duration === currentTime) {
      changeStatus()
      onStop()
    }
  }, [currentTime])

  function onStart() {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      dispatch(addTimeTask(id))
    }, 1000)

    dispatch(setIntervalTaskRef({ id, intervalRef: intervalRef.current }))
  }

  function onStop() {
    // остановка таймера
    setIsRunning(false)
    if (typeof intervalRef.current === "undefined") {
      clearInterval(storeIntervalRef)
    } else {
      clearInterval(intervalRef.current)
    }
    dispatch(setIntervalTaskRef({ id, intervalRef: undefined }))
  }

  function onDestroy() {
    // удаление задачи
    dispatch(removeTask(id))
  }

  const taskInputRef = useRef<HTMLInputElement>(null)

  useOutsideClick({
    elementRef: taskInputRef,
    enabled: isEdit,
    onOutsideClick: () => setIsEdit(false),
  })

  function onSave() {
    setIsEdit(false)
    dispatch(editTask({ id, value: taskInputRef.current?.value.trim() || "" }))
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
              setIsEdit={setIsEdit}
              onStart={onStart}
              onDestroy={onDestroy}
              duration={duration}
              currentTime={currentTime}
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
          onKeyDown={(e) => e.key === "Enter" && onSave()}
          ref={taskInputRef}
        />
      )}
    </li>
  )
}

type DisabledTimerProps = {
  status: TaskStatus
  setIsEdit: Dispatch<SetStateAction<boolean>>
  onStart: () => void
  onDestroy: () => void
  duration: number
  currentTime: number
}

Task.disabledTimer = ({ status, setIsEdit, onStart, onDestroy, duration, currentTime }: DisabledTimerProps) => {
  return (
    <>
      <span className={styles.duration}>
        {currentTime > 0 ? lightFormat(currentTime, "mm:ss") : lightFormat(duration, "mm:ss")}
      </span>
      {status === "active" ? <button type="button" className={styles["icon-start"]} onClick={onStart}></button> : null}
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
      <span className={styles.duration}>{lightFormat(currentTime, "mm:ss")}</span>
      <button onClick={onStop} className={styles["icon-stop"]}></button>
    </>
  )
}

export default Task
