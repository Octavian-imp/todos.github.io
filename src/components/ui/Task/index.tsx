import cn from "clsx"
import { formatDistanceToNow } from "date-fns"
import React, { PropsWithChildren, useContext, useRef, useState } from "react"
import { useOutsideClick } from "../../../libs/hooks/useOutsideClick"
import TasksStore from "../../../store"
import { TaskStatus } from "../../../types/Task"
import styles from "./index.module.scss"

type Props = {
  status: TaskStatus
  id: string
  createdAt: Date
}

const Task = ({
  status,
  id,
  children,
  createdAt,
}: PropsWithChildren<Props>) => {
  const { tasks, setTasks } = useContext(TasksStore)
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState<string>(
    tasks.find((task) => task.id === id)?.content || ""
  )

  const taskInputRef = useRef<HTMLInputElement>(null)

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

  useOutsideClick({
    elementRef: taskInputRef,
    onOutsideClick: onSave,
    enabled: isEdit,
  })

  function onDestroy() {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <li
      className={cn(
        { [styles.editing]: isEdit },
        { [styles.completed]: status === "completed" }
      )}
    >
      <div className={styles.view}>
        <input className={styles.toggle} type="checkbox" />
        <label className={styles.label}>
          <span className={styles.description}>{children}</span>
          <span className={styles.created}>
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </label>
        <button
          className={cn(styles.icon, styles["icon-edit"])}
          onClick={() => setIsEdit((prev) => !prev)}
        ></button>
        <button
          className={cn(styles.icon, styles["icon-destroy"])}
          onClick={onDestroy}
        ></button>
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

export default Task
