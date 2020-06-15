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
  console.log("DataOverviewPage -> selectedSensor", selectedSensor)
  const [selectedDetail, setSelectedDetail] = React.useState('')
  const [selectedRoom, setSelectedRoom] = React.useState('')
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

  const getRoomSensorData = (room, sensorType) => {
    getSensorData(room, sensorType)
      .then(response => {
        setSensorData(response.data)
        setGenerate(true)
      })
      .catch(err => {
        console.log('Get Sensor Data Err', err)
      })
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <DatePicker />
        <div className={classes.wrapper}>
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
          <FormControl className={classes.formControl}>
            <InputLabel>Telpa</InputLabel>
            <Select
              MenuProps={anchorRef}
              value={selectedRoom}
              onChange={e => setSelectedRoom(e.target.value)}>
              {roomConfig &&
                roomConfig.map(room => {
                  return (
                    <MenuItem key={`${room.name}-key`} value={room.value}>
                      {room.name}
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
            getRoomSensorData(selectedRoom, selectedSensor)
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
          />
        )}
      </div>
    </React.Fragment>
  )
}
