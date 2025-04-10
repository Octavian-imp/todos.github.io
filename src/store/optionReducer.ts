import { createSlice } from "@reduxjs/toolkit"
import { TaskStatus } from "../types/Task"

const initialState: {
  activeFilter: TaskStatus | "all"
} = {
  activeFilter: "all",
}

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setFilter: (state, action: { payload: TaskStatus | "all" }) => {
      state.activeFilter = action.payload
    },
  },
})

export const { setFilter } = optionsSlice.actions

export default optionsSlice.reducer

