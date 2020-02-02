import React from "react"

const CountryContainer = ({ countries}) => {
  console.log(countries)
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <div>
          <h3>Languages</h3>
          <ul>
            {country.languages.map(language => (
              <li>{language.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={country.flag} />
        </div>
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => (
          <p key={country.id}>{country.name}</p>
        ))}
      </div>
    )
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>
  }
}

export default CountryContainer
