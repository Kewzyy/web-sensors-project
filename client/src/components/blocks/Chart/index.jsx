import React from 'react'


import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts'
import { theme } from 'config/theme'

export const Chart = ({
  apiData,
  timePeriod,
  selectedPrecision,
}) => {

  const data = []
  const sensorData = typeof apiData !== 'undefined' ? apiData : []

  function dateIsInRange(sensor) {
    return new Date(sensor.date) >= this.startDate && new Date(sensor.date) <= this.endDate;
  }

  let range = {
    startDate: new Date(timePeriod.startDate),
    endDate: new Date(timePeriod.endDate)
  }

  let filteredSensorData = sensorData.filter(dateIsInRange, range);

  //sort by date, since api gives data starting from endDate to startDate
  filteredSensorData.sort(function(a,b){
    return new Date(a.date) - new Date(b.date)
  })

  filteredSensorData.forEach(o => {
    data.push({
      xAxisLabel: `${o.date} ${o.time}`,
      date: o.date,
      sensora_vertiba: o.value,
    })
  })
  
  console.log("apiData", apiData)
  console.log("timePeriod,", timePeriod,)
  console.log("selectedPrecision", selectedPrecision)

  // const average = data.reduce((total, next) => total + next.value, 0) / data.length
  // console.log('Chart -> average', average)

  return (
    data.length > 0 && (
      <BarChart width={800} height={640} data={data}>
        <CartesianGrid />
        <XAxis dataKey='xAxisLabel'/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='sensora_vertiba' label='test' fill={theme.palette.secondary.main.toString()} />
      </BarChart>
    )
  )
}
