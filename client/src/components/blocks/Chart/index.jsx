import React from 'react'


import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts'
import { theme } from 'config/theme'
import {
  convertTime12to24,
  getDataFilteredByDate,
  getSortedData,
  getAverageFromFilteredSensorData,
} from 'functions'

import { Typography } from '@material-ui/core'

export const Chart = ({
  apiData,
  timePeriod,
  selectedPrecision,
  optionsState,
  selectedRoomNames,
}) => {

  const sensorData = typeof apiData !== 'undefined' ? apiData : []

  /*
  // sensorData structure
  data = [
   [
        {
            "_id": "5ee7293996b29c00109ff4c3",
            "room": "Servertelpa",
            "type": "co2",
            "date": "01/17/2020",
            "time": "10:45:29 AM",
            "value": "400"
        },
        ...
   ],
   [
        {
            "_id": "5ee7293a96b29c0010a01fdb",
            "room": "14telpa",
            "type": "co2",
            "date": "01/17/2020",
            "time": "10:58:25 AM",
            "value": "534"
        },
        ...
   ]
  ]

  */
  //console.log("Chart sensorData: ", sensorData)

  let averages = []

  let filteredRoomData = []
  sensorData.forEach(roomdata => {
    let dateFilteredSensorData = getDataFilteredByDate(roomdata, timePeriod)
    //sort by date and time, since api gives data starting from endDate to startDate
    let sortedFilteredData = getSortedData(dateFilteredSensorData)
    filteredRoomData.push(sortedFilteredData)
    averages.push(getAverageFromFilteredSensorData(sortedFilteredData))
  })

  console.log("filteredRoomData: ", filteredRoomData)
  console.log("selectedRoomNames: ", selectedRoomNames)
  console.log("averages: ", averages)

  //const data = []

  /*filteredSensorData.forEach(o => {
    data.push({
      xAxisLabel: `${o.date} ${o.time}`,
      date: o.date,
      sensora_vertiba: o.value,
    })
  })
  */
  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];


  return (
    data.length > 0 && (
      <React.Fragment>
        <BarChart width={800} height={640} data={data}>
          <CartesianGrid />
          <XAxis dataKey='xAxisLabel'/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </React.Fragment>
    )
  )
}
