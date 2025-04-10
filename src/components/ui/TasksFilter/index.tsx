import cn from "clsx"
import React, { MouseEvent, useState } from "react"
import filterTodos, { FilterName } from "../../../mock/filters"
import { setFilter } from "../../../store/optionReducer"
import { useAppDispatch, useAppSelector } from "../../../store/reduxStore"
import styles from "./index.module.scss"

const TasksFilter = () => {
  const dispatch = useAppDispatch()
  const activeFilter = useAppSelector((state) => state.options.activeFilter)

  const [activeFilterId, setActiveFilterId] = useState(activeFilter)

  function onSelectFilter(e: MouseEvent<HTMLButtonElement>, id: typeof activeFilter, filterName: FilterName) {
    if (e.target instanceof HTMLElement) {
      e.target.classList.add(styles.selected)
      setActiveFilterId(id)
      filterTasks(filterName)
    }
  }

  function filterTasks(filterName: FilterName) {
    dispatch(setFilter(filterName))
  }

  return (
    <ul className={styles.filters}>
      {filterTodos.map((filter) => (
        <li key={filter.id}>
          <button
            onClick={(e) => onSelectFilter(e, filter.name, filter.name)}
            className={cn({ [styles.selected]: filter.name === activeFilterId })}
          >
            {filter.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksFilter
