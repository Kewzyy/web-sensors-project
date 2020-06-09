function createData(room, type, date, time, value) {
  return { room, type, date, time, value }
}

export const mockedData = [
  createData('Servertelpa', 'co2', '01/17/2020', '10:45:29 AM', '400'),
  createData('Servertelpa', 'co2', '02/17/2020', '10:45:29 AM', '500'),
]
