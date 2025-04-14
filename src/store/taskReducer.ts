import { createSlice } from "@reduxjs/toolkit"
import mockTasks from "../mock/store"
import { TaskStatus } from "../types/Task"

export type Task = {
  id: string
  status: TaskStatus
  createdAt: number
  content: string
  duration: number
  currentDuration: number
  intervalRef?: NodeJS.Timeout
}

const initialState: Array<Task> = mockTasks

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add(state, action: { payload: Task }) {
      return [action.payload, ...state]
    },
    addTime(state, action: { payload: string }) {
      return state.map((task) => {
        const second = 1000

        return task.id === action.payload
          ? {
              ...task,
              currentDuration: task.currentDuration + second,
              status: task.duration === task.currentDuration ? "completed" : "active",
            }
          : task
      })
    },
    stop(state, action: { payload: { id: string; currentTime: number } }) {
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, currentDuration: action.payload.currentTime } : task
      )
    },
    remove(state, action: { payload: string }) {
      return state.filter((task) => task.id !== action.payload)
    },
    editValue(state, action: { payload: { id: string; value: string } }) {
      return state.map((task) => (task.id === action.payload.id ? { ...task, content: action.payload.value } : task))
    },
    setIntervalRef(state, action: { payload: { id: string; intervalRef: NodeJS.Timeout | undefined } }) {
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, intervalRef: action.payload.intervalRef } : task
      )
    },
    setTime(state, action: { payload: { id: string; currentTime: number } }) {
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, currentDuration: action.payload.currentTime } : task
      )
    },
    clearCompleted(state) {
      return state.filter((task) => task.status !== "completed")
    },
    changeStatus(state, action: { payload: { id: string; status: TaskStatus } }) {
      return state.map((task) => (task.id === action.payload.id ? { ...task, status: action.payload.status } : task))
    },
  },
})

export const {
  add: addTask,
  addTime: addTimeTask,
  editValue: editTask,
  stop: stopTask,
  remove: removeTask,
  setIntervalRef: setIntervalTaskRef,
  setTime: setTimeTask,
  clearCompleted: clearCompletedTasks,
  changeStatus: changeTaskStatus,
} = taskSlice.actions

export default taskSlice.reducer
