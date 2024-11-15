import cn from "clsx"
import React, { MouseEvent, useContext, useState } from "react"
import filterTodos, { FilterName } from "../../../mock/filters"
import TasksStore from "../../../store"
import styles from "./index.module.scss"

const TasksFilter = () => {
  const [activeFilterId, setActiveFilterId] = useState(filterTodos[0].id)
  const { setActive: setActiveFilter } = useContext(TasksStore)

  function onSelectFilter(e: MouseEvent<HTMLButtonElement>, id: string, filterName: FilterName) {
    if (e.target instanceof HTMLElement) {
      e.target.classList.add(styles.selected)
      setActiveFilterId(id)
      filterTasks(filterName)
    }
  }

  function filterTasks(filterName: FilterName) {
    setActiveFilter(filterName)
  }

  return (
    <ul className={styles.filters}>
      {filterTodos.map((filter) => (
        <li key={filter.id}>
          <button
            onClick={(e) => onSelectFilter(e, filter.id, filter.name)}
            className={cn({ [styles.selected]: filter.id === activeFilterId })}
          >
            {filter.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksFilter
