import React from "react"
import { Provider } from "react-redux"
import "./App.scss"
import Footer from "./components/ui/Footer"
import NewTaskForm from "./components/ui/NewTaskForm"
import TasksList from "./components/ui/TaskList"
import { reduxStore } from "./store/reduxStore"

const App = () => {
  return (
    <Provider store={reduxStore}>
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TasksList />
          <Footer />
        </section>
      </section>
    </Provider>
  )
}

export default App
