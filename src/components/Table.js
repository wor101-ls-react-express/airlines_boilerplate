import React from 'react'

const Thead = ({ column }) =>(<td><strong>{column.name}</strong></td>)

const Tr = ({ row, format }) => {
  const airlineName = format('airline', row.airline).name
  const airportSrc = format('airport', row.src).name
  const airportDest = format('airport', row.dest).name

  return (
    <tr>
      <td>{airlineName}</td><td>{airportSrc}</td><td>{airportDest}</td>
    </tr>
  )
}

const Table = ({columns, rows, format}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (<Thead key={column.property} column={column}/>))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (<Tr key={index} row={row} format={format}/>))}
      </tbody>
    </table>
  )
}

export default Table