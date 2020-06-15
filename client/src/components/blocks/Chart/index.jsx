import React from 'react'


import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts'
import { theme } from 'config/theme'
import { convertTime12to24 } from 'functions'

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

  //sort by date and time, since api gives data starting from endDate to startDate
  filteredSensorData.sort(function(a,b){
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    if (a.date === b.date) {
      let atime = convertTime12to24(a.time)
      let btime = convertTime12to24(b.time)
      if (atime < btime) return -1
      if (atime > btime) return 1
      return 0
    }
  });

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
