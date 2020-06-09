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
