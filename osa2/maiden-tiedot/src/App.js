import React, { useState, useEffect } from "react"
import axios from "axios"
import CountryContainer from "./components/CountryContainer"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const results = countries.filter(country =>
    country.name.toUpperCase().includes(searchTerm.toUpperCase())
  )

  return (
    <div className="App">
      <h1>Find countries</h1>
      <input value={searchTerm} onChange={handleChange} />
      <CountryContainer countries={results}/>
    </div>
  )
}

export default App
