import axios from 'axios'


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
    return await axios.get(process.env.REACT_APP_API_HOST_URI + '/roomnames')
  } catch (error) {
    console.log('Error while fetching rooms')
    return error
  }
}

export const addNewRoom = async (room, sensorType) => {
  try {
    return await axios.post(
      process.env.REACT_APP_API_HOST_URI + '/filldb/add',
      {
        room:room,
        type:sensorType,
        value:"0"
      }
    )
  } catch (error) {
    console.log('Error while fetching rooms')
    return error
  }
}
