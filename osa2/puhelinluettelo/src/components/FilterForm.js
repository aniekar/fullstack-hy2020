import React from "react"

const FilterForm = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <form>
        Filter by name:
        <input value={filter} onChange={handleFilterChange}></input>
      </form>
    </div>
  )
}

export default FilterForm
