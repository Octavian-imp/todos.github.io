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
              currentDuration: task.currentDuration - second,
              status: task.currentDuration === 0 ? "completed" : "active",
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
    update(state, action: { payload: { id: string } & Partial<Omit<Task, "id">> }) {
      return state.map((task) => (task.id === action.payload.id ? { ...task, ...action.payload } : task))
    },
  },
})

export const {
  add: addTask,
  addTime: addTimeTask,
  stop: stopTask,
  remove: removeTask,
  setIntervalRef: setIntervalTaskRef,
  setTime: setTimeTask,
  clearCompleted: clearCompletedTasks,
  update: updateTask,
} = taskSlice.actions

export default taskSlice.reducer
