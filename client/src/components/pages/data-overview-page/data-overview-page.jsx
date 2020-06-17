import React from 'react'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Button,
} from '@material-ui/core'

import { useStyles } from './styles'
import { anchorRef } from '../../../constants'
import { DatePicker } from 'components/blocks/Datepicker'
import { sensorConfig as sensorTypes, detailConfig, roomConfig } from '../../../config'
import { useRecoilValue } from 'recoil'
import { dateTimeRangeState } from '../../../atoms'
import { Chart } from '../../blocks/Chart'
import { mockApiData } from 'constants/mock-data'
import { getSensorData } from '../../../apis/requests'

export const DataOverviewPage = () => {
  const classes = useStyles()
  const [selectedSensor, setSelectedSensor] = React.useState('')
  const [selectedDetail, setSelectedDetail] = React.useState('')
  const [selectedRoomNames, setSelectedRoomNames] = React.useState(null)

  const [selectedRoomsState, setSelectedRoomsState] = React.useState({
    servertelpa: false,
    telpa14: false,
    telpa13: false,
    videotelpa: false,
    dispecertelpa: false,
  })

  const handleRoomsCheck = e => {
    setSelectedRoomsState({ ...selectedRoomsState, [e.target.name]: e.target.checked })
  }

  const [sensorData, setSensorData] = React.useState([])

  const [checkBoxState, setCheckBoxState] = React.useState({
    showAvg: false,
    showDiff: false,
  })
  const [chartData, setChartData] = React.useState({
    data: {},
    timePeriod: {},
    selectedPrecision: '',
  })
  const [generate, setGenerate] = React.useState(false)
  const dateData = useRecoilValue(dateTimeRangeState)
  const handleCheck = e => {
    setCheckBoxState({
      ...checkBoxState,
      [e.target.name]: e.target.checked,
    })
  }

  const getRoomSensorData = () => {
    var selectedRooms = []
    if (selectedRoomsState.servertelpa) selectedRooms.push('Servertelpa')
    if (selectedRoomsState.telpa14) selectedRooms.push('14telpa')
    if (selectedRoomsState.telpa13) selectedRooms.push('13telpa')
    if (selectedRoomsState.videotelpa) selectedRooms.push('Videotelpa')
    if (selectedRoomsState.dispecertelpa) selectedRooms.push('Dispecerutelpa')

    setSelectedRoomNames(selectedRooms)

    let requestsProcessed = 0
    console.log("selectedRooms", selectedRooms)

    let retrievedSensorData = []
    selectedRooms.forEach(async (room, index) => {
      getSensorData(room, selectedSensor)
        .then(response => {
          retrievedSensorData.push(response.data)
          requestsProcessed++
          if(requestsProcessed === selectedRooms.length) {
            setSensorData(retrievedSensorData)
            setGenerate(true)
          }
        })
        .catch(err => {
          console.log('Get Sensor Data Err', err)
        })
    })
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <DatePicker />
        <div className={classes.wrapper}>

          <FormControl component='fieldset' className={classes.checkBoxes}>
            <FormGroup>
              <FormLabel component='legend'>Diagrammā iekļaujamās telpas</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox checked={selectedRoomsState.servertelpa} onChange={handleRoomsCheck} name='servertelpa' />
                }
                label='Servertelpa'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={selectedRoomsState.telpa14} onChange={handleRoomsCheck} name='telpa14' />
                }
                label='14telpa'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={selectedRoomsState.videotelpa} onChange={handleRoomsCheck} name='videotelpa' />
                }
                label='VideoTelpa'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={selectedRoomsState.dispecertelpa} onChange={handleRoomsCheck} name='dispecertelpa' />
                }
                label='DispeceruTelpa'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={selectedRoomsState.telpa13} onChange={handleRoomsCheck} name='telpa13' />
                }
                label='13telpa'
              />
            </FormGroup>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel> Sensora tips</InputLabel>
            <Select
              MenuProps={anchorRef}
              value={selectedSensor}
              onChange={e => setSelectedSensor(e.target.value)}>
              {sensorTypes &&
                sensorTypes.map(sensor => {
                  return (
                    <MenuItem key={`${sensor.name}-key`} value={sensor.value}>
                      {sensor.name}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>

          <FormControl component='fieldset' className={classes.checkBoxes}>
            <FormGroup>
              <FormLabel component='legend'>Papildus opcijas</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox checked={checkBoxState.showAvg} onChange={handleCheck} name='showAvg' />
                }
                label='Vidējais patēriņš par periodu'
              />
            </FormGroup>
          </FormControl>
        </div>
        <Button
          className={classes.generateChart}
          variant='contained'
          color='default'
          onClick={() => {
            getRoomSensorData()
            setChartData({
              // Pass data from api call here
              // api call generates from selectedSensor and selectedRoom
              // btw reali slikti api endpointu nosaukumi, par to vien vajadzetu neiskaitits
              timePeriod: dateData,
              selectedPrecision: selectedDetail,
            })
          }}>
          Generate chart
        </Button>
        {generate && chartData && (
          <Chart
            apiData={sensorData}
            timePeriod={chartData.timePeriod}
            selectedPrecision={chartData.selectedPrecision}
            optionsState={checkBoxState}
            selectedRoomNames={selectedRoomNames}
          />
        )}
      </div>
    </React.Fragment>
  )
}
