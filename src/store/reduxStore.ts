import { configureStore, createSelector } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import optionReducer from "./optionReducer"
import taskReducer from "./taskReducer"

export const reduxStore = configureStore({
  reducer: { tasks: taskReducer, options: optionReducer },
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const createAppSelector = createSelector.withTypes<RootState>()
