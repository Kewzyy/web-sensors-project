import axios from 'axios'

const API_HOST = process.env.REACT_APP_API_HOST_URI
/* returns room data in the following format:
    {
        [
            {
                "room":"Servertelpa",
                "types": [
                    "co2",
                    "humidity",
                    "temp"
                ]
            },
            ...
        ]
    }
*/
export const getDistinctRooms = async () => {
  try {
    return await axios.get(API_HOST + '/roomnames')
  } catch (error) {
    console.log('Error while fetching rooms')
    return error
  }
}

export const addNewRoom = async (room, sensorType) => {
  try {
    return await axios.post(API_HOST + '/filldb/add', {
      room: room,
      type: sensorType,
      value: '0',
    })
  } catch (error) {
    console.log('Error while fetching rooms')
    return error
  }
}

/* returns sensor data in the following format:
    [
        {
            "_id": "5ee66054184fed0010a62c9e",
            "room": "Servertelpa",
            "type": "co2",
            "date": "01/17/2020",
            "time": "10:45:29 AM",
            "value": "400"
        },
        ...
    ]
*/
export const getSensorData = async (room, type) => {
  try {
    return await axios.get(API_HOST + `/${room}/${type}`)
  } catch (error) {
    console.log('Error while fetching sensor data')
    return error
  }
}

export const getSensorDataForAlerts = async (
    selectedStartDate,
    selectedEndDate,
    room,
    sensorType,
    thresholdCondition,
    conditionValue) => {
  try {
    return await axios.get(API_HOST + '/alerts', {
      params: {
        dateFrom: selectedStartDate,
        dateTo: selectedEndDate,
        room: room,
        type: sensorType,
        condition: thresholdCondition + '-' + conditionValue,
      }
    })
  } catch (error) {
    console.log('Error while fetching alerts sensor data')
    return error
  }
}
