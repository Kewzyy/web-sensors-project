import React from 'react'


import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

import {
  getDataFilteredByDate,
  getSortedData,
  getAverageFromFilteredSensorData,
  getRandomColor,
  getDateTimeObjectArray,
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
  [
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

  let dateTimeObjArray = getDateTimeObjectArray(filteredRoomData)
  console.log("dateTimeObjArray: ", dateTimeObjArray)

  dateTimeObjArray.forEach(datetime => {
    // for each datetime
    filteredRoomData.forEach(roomDataArray => {
      //for each room
      roomDataArray.forEach(roomSensorData => {
        // for each sensor data and datetime add room and its value
        if(roomSensorData.date === datetime.date && roomSensorData.time === datetime.time){
          datetime[roomSensorData.room] = roomSensorData.value
        }
      })
    })
  })

  console.log("dateTimeObjArray: ", dateTimeObjArray)
  const data = dateTimeObjArray

  return (
    data.length > 0 && (
      <React.Fragment>
        { optionsState.showAvg ?
          (averages.map((avgobj, index) => {
            return (
              <Typography key={index} variant='overline' style={{ margin: '10px' }}>
                Vidējā vērtiba telpai: {avgobj.room} - {avgobj.average}
              </Typography>
            )
          }))
        : null
        }
        <LineChart width={800} height={640} data={data}>
          <CartesianGrid />
          <XAxis dataKey='datetime'/>
          <YAxis />
          <Tooltip />
          <Legend />
          {
          	filteredRoomData.map((sensorData, index) => {
              return <Line type="monotone" key={index} dataKey={sensorData[0].room} stroke={getRandomColor()} />
            })
          }
        </LineChart>
      </React.Fragment>
    )
  )
}
