import React from 'react'

import { mockApiData } from 'constants/mock-data'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts'
import { theme } from 'config/theme'

export const Chart = () => {
  const filteredData = mockApiData.filter(data => {
    return data.type === 'mitrums'
  })
  console.log('Chart -> filteredData', filteredData)

  const data = []

  filteredData.forEach(o => {
    data.push({
      date: o.date,
      value: o.value,
    })
  })
  const tickFormatterDay = tickItem => {
    return tickItem
  }
  console.log('Chart -> data', data)
  //TODO:
  // x-ass formatēšana abām detalizācijas pakāpēm
  /* 
  pareizo datu filtrēšana
    [
    atlasit laiku, 
    telpu,
    sensoru,
    detalizacijas pakapi,

    starpiiba - kaa to reekina?
    ]

  */
  const average = data.reduce((total, next) => total + next.value, 0) / data.length
  console.log('Chart -> average', average)

  return (
    data.length > 0 && (
      <BarChart width={800} height={640} data={data}>
        <CartesianGrid />
        <XAxis dataKey='name' tickFormatter={tickFormatterDay} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='value' fill={theme.palette.secondary.main.toString()} />
      </BarChart>
    )
  )
}
