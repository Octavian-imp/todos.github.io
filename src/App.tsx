import React, { useState } from "react"
import "./App.scss"
import Footer from "./components/ui/Footer"
import NewTaskForm from "./components/ui/NewTaskForm"
import TasksList from "./components/ui/TaskList"
import mockTasks from "./mock/store"
import TasksStore, { Task } from "./store"
import { TaskStatus } from "./types/Task"

const App = () => {
  const [tasks, setTasks] = useState<Array<Task>>(mockTasks)
  const [activeFilter, setActiveFilter] = useState<Omit<TaskStatus, "pause"> | "all">("all")
  return (
    <TasksStore.Provider
      value={{
        setTasks,
        tasks,
        active: activeFilter,
        setActive: setActiveFilter,
      }}
    >
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TasksList />
          <Footer />
        </section>
      </section>
    </TasksStore.Provider>
  )
}

export default App
