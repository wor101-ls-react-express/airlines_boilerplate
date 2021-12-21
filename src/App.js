import React, { useEffect } from 'react';
import { useState } from 'react'
import './App.css';
import data from './data.js'
import { getAirlineById, getAirportByCode } from './data.js';
import Table from './components/Table'
import Select from './components/Select'
import Svg from './components/Svg'

const App = () => {
  const [page, setPage] = useState(0)
  const [routes, setRoutes] = useState(data.routes)
  const [filter, setFilter] = useState({ airline: 'all', airport: 'all'})
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  
  const formatValue = (property, value) => {
    switch(property) {
      case 'airline':
        return getAirlineById(value)
      default:
        return getAirportByCode(value)
    }
  }

  const filterPageRoutes = () => {
    return routes.slice(page, page + 25)
  }
  const previousPage = () => ((page - 25) < 0) ? setPage(0) : setPage(page - 25)
  const nextPage = () => ((page + 25) < routes.length - 25) ? setPage(page + 25) : setPage(routes.length - 25)

  const updateFilter = (key) => {
    return (event) => {
      switch(key) {
        case 'airline':
          const value = event.target.value === 'all' ? 'all' : parseInt(event.target.value, 10)
          setFilter({...filter, airline: value})
          break
        case 'airport':
          setFilter({...filter, airport: event.target.value})
          break
        default:
          break
      }
    }
  }

  // update routes when filter changes
  useEffect(() => {
    let filteredRoutes = [...data.routes]
    if (filter.airline !== 'all') {
      filteredRoutes = filteredRoutes.filter(route => route.airline === filter.airline)
    }

    if (filter.airport !== 'all') {
      filteredRoutes = filteredRoutes.filter(route => route.src === filter.airport || route.dest === filter.airport)
    }
    setRoutes(filteredRoutes)

  }, [filter])

  // toggle button disabled
  useEffect(() => {
    if (page === 0) {
      document.getElementById('previousPage').disabled = true
      document.getElementById('nextPage').disabled = false
    } else if (page >= routes.length -25) {
      document.getElementById('previousPage').disabled = false
      document.getElementById('nextPage').disabled = true
    } else {
      document.getElementById('previousPage').disabled = false
      document.getElementById('nextPage').disabled = false
    }
  })


  const filterSelectOptions = (type) => {
    let filteredOptionList;
    console.log('CurrenRoutes: ', routes)

    if (type === 'airline') {
      filteredOptionList = [...data.airlines]
      if (filter.airport === 'all') {
        return filteredOptionList
      }

      filteredOptionList = filteredOptionList.map(airline => {
        const airlineId = airline.id
        if (routes.find(route => route.airline === airlineId && (route.src === filter.airport || route.dest === filter.airport))) {
          return {...airline, disabled: false}
        } else {
          return {...airline, disabled: true}
        }
      })

    } else if (type ==='airport') {
      filteredOptionList = [...data.airports]
      if (filter.airline === 'all') {
        return filteredOptionList
      }

      filteredOptionList = filteredOptionList.map(airport => {
        const airportCode = airport.code
        if (routes.find(route => (route.src === airportCode || route.dest === airportCode) && route.airline === filter.airline)) {
          return {...airport, disabled: false}
        } else {
          return {...airport, disabled: true}
        }
      })
    }


      console.log(`Filtered ${type}: `, filteredOptionList)
      return filteredOptionList
  }


  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
    <Svg routes={routes} airports={data.airports} />
      <p>
        Welcome to the app!
      </p>
      <label>Show routes on </label>
      <Select options={filterSelectOptions('airline')} valueKey="id" titleKey="name" onSelect={updateFilter('airline')} allTitle="All Airlines"/>
      <Select options={filterSelectOptions('airport')} valueKey="code" titleKey="name" onSelect={updateFilter('airport')} allTitle="All Airports"/>
      <Table className="routes-table" columns={columns} rows={filterPageRoutes()} format={formatValue}/>
      <p>Showing {page + 1}-{page + 25} of {routes.length}</p>
      <button id="previousPage" onClick={previousPage}>previous page</button><button id="nextPage" onClick={nextPage}>next page</button>
    </section>
  </div>
  )
}

export default App;