export const getFormattedDateTime = date => {
  let day = null
  let month = null
  let year = null

  let hours = null
  let minutes = null

  if (date !== null && typeof date !== 'undefined') {
    var inputDate = new Date(Date.parse(date))
    day = inputDate.getDate()
    month = inputDate.getMonth() + 1
    year = inputDate.getFullYear()

    hours = inputDate.getHours()
    minutes = inputDate.getMinutes()
  }
  return `${month !== null && month < 10 ? `0${month}` : `${month}`}/${
    day !== null && day < 10 ? `0${day}` : `${day}`
  }/${year}
          ${hours !== null && hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes !== null && minutes < 10 ? `0${minutes}` : `${minutes}`
  }`
}

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes, seconds] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}:${seconds}`;
}

export const getDataFilteredByDate = (sensorData, timePeriod) => {
  function dateIsInRange(sensor) {
    return new Date(sensor.date) >= this.startDate && new Date(sensor.date) <= this.endDate;
  }

  let range = {
    startDate: new Date(timePeriod.startDate),
    endDate: new Date(timePeriod.endDate)
  }

  return sensorData.filter(dateIsInRange, range);
}

export const getSortedData = (data) => {
  return data.sort(function(a,b){
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    if (a.date === b.date) {
      let atime = convertTime12to24(a.time)
      let btime = convertTime12to24(b.time)
      if (atime < btime) return -1
      if (atime > btime) return 1
    }
    return 0
  })
}

export const getAverageFromFilteredSensorData = (sensorData) => {

  const values = sensorData.map(sensorDataObj => sensorDataObj.value)
  const roomName = sensorData[0].room
  function addValues(runningTotal, value) {
    return runningTotal + parseInt(value, 10);
  }

  const valuesTotal = values.reduce(addValues, 0)
  const averageSensorDataValue = valuesTotal / values.length
  return { room: roomName, average: averageSensorDataValue }
}

export const getRandomColor = () => {
  var letters = '0123456789ABC';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 13)];
  }
  return color;
}

export const dateTimeExistsInArray = (value, data) => {
  for (var i = 0; i < data.length; i++) {
    var dateValue = data[i];
    if(dateValue.datetime === value) return true;
  }
  return false;
}

export const getDateTimeObjectArray = (filteredRoomData) => {
  let dateTimeObjArray = []

  filteredRoomData.forEach(roomDataArray => {
    // for each room
    roomDataArray.forEach(roomSensorData => {
      // for each data in this room
        //store unique datetime
      let datetime = `${roomSensorData.date} ${roomSensorData.time}`
      if(!dateTimeExistsInArray(datetime, dateTimeObjArray)) {
        let dateTimeJson = {
          date: roomSensorData.date,
          time: roomSensorData.time,
          datetime: datetime,
        }
        dateTimeObjArray.push(dateTimeJson)
      }
    })
  })
  return getSortedData(dateTimeObjArray)
}
