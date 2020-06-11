const createData = (room, type, date, time, value) => {
  return { room, type, date, time, value }
}

export const mockApiData = [
  createData('Servertelpa', 'co2', '05/17/2020', '10:45:29 AM', '400'),
  createData('Servertelpa', 'co2', '05/17/2020', '11:00:29 AM', '500'),
  createData('Servertelpa', 'co2', '05/17/2020', '11:15:29 AM', '300'),
  createData('Servertelpa', 'co2', '05/17/2020', '11:30:29 AM', '400'),
  createData('Servertelpa', 'co2', '05/17/2020', '11:45:29 AM', '200'),
  createData('Servertelpa', 'co2', '05/17/2020', '12:00:29 AM', '125'),
  createData('Servertelpa', 'temp', '06/08/2020', '10:45:29 AM', '200'),
  createData('Servertelpa', 'temp', '06/09/2020', '10:45:29 AM', '350'),
  createData('Servertelpa', 'temp', '06/10/2020', '10:45:29 AM', '392'),
  createData('Servertelpa', 'temp', '06/11/2020', '10:45:29 AM', '280'),
  createData('Servertelpa', 'temp', '06/12/2020', '10:45:29 AM', '62'),
  createData('Servertelpa', 'mitrums', '06/14/2020', '10:45:29 AM', '100'),
  createData('Servertelpa', 'mitrums', '06/15/2020', '10:45:29 AM', '200'),
  createData('Servertelpa', 'mitrums', '06/16/2020', '10:45:29 AM', '223'),
  createData('Servertelpa', 'mitrums', '06/17/2020', '10:45:29 AM', '167'),
]
