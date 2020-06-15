import React from 'react'

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography,
  TextField,
  List,
  ListItem,
  Paper,
} from '@material-ui/core'

import { Table } from '../../blocks/Table'
import { getFormattedDateTime } from '../../../functions'

import { getDistinctRooms, getSensorDataForAlerts } from '../../../apis/requests'

import { columnsConfig } from '../../../config/alert-table-columns'
import { mockedData } from './mockedData'
import { styles } from './styles'

export const AlertsPage = () => {
  const classes = styles()

  const [roomNames, setRoomNames] = React.useState([])

  const [room, setRoom] = React.useState('Servertelpa')
  const [sensorType, setSensorType] = React.useState('co2')

  const [thresholdCondition, setThresholdCondition] = React.useState('eq')
  const [conditionValue, setConditionValue] = React.useState('400')

  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date('2020-01-01T21:11:54'))
  const [selectedToDate, setSelectedToDate] = React.useState(new Date('2020-01-03T21:11:54'))

  const [alertData, setAlertData] = React.useState(null)

  const handleSensorTypeChange = event => {
    setSensorType(event.target.value)
  }
  const handleRoomChange = event => {
    setRoom(event.target.value)
  }
  const handleThresholdConditionChange = event => {
    setThresholdCondition(event.target.value)
  }
  const handleDateFromChange = event => {
    setSelectedFromDate(event.target.value)
  }
  const handleDateToChange = event => {
    setSelectedToDate(event.target.value)
  }
  const handleConditionValueChange = event => {
    setConditionValue(event.target.value)
  }

  // Almost beauty
  React.useEffect(() => {
    getSensorDataForAlerts(selectedFromDate, selectedToDate, room, sensorType, thresholdCondition, conditionValue)
      .then(response => {
        setAlertData(response.data)
      })
      .catch(err => {
        console.log('Get Alert Data Err', err)
      })

    getDistinctRooms()
      .then(response => {
        console.log('response.data', response.data)
        var roomNames = []
        response.data.map(roomObj => roomNames.push(roomObj.room))
        setRoomNames(roomNames)
      })
      .catch(err => {
        console.log('Get RoomName Data Err', err)
      })
  }, [selectedFromDate, selectedToDate, room, sensorType, thresholdCondition, conditionValue])

  /* TODO: Map entire page from config object and boom resuable component */
  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            <form className={classes.datetimeContainer} noValidate>
              <TextField
                id='datetime-local-from'
                label='Datums no'
                type='datetime-local'
                defaultValue='2020-01-01T21:11:54'
                className={classes.dateTimeTextField}
                onChange={handleDateFromChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <form className={classes.datetimeContainer} noValidate>
              <TextField
                id='datetime-local-to'
                label='Datums līdz'
                type='datetime-local'
                defaultValue='2020-01-03T21:11:54'
                className={classes.dateTimeTextField}
                onChange={handleDateToChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id='open-select-label-room'>Telpa</InputLabel>
                <Select
                  labelId='open-select-label-room'
                  id='open-select-room'
                  value={room}
                  onChange={handleRoomChange}>
                  {roomNames && roomNames.length > 0 ? (
                    roomNames.map(room => (
                      <MenuItem key={room} value={room}>
                        {room}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key='Servertelpa' value='Servertelpa'>
                      Servertelpa
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id='open-select-label-sensorType'>Sensora tips</InputLabel>
                <Select
                  labelId='open-select-label-sensorType'
                  id='open-select-sensorType'
                  value={sensorType}
                  onChange={handleSensorTypeChange}>
                  {/* TODO: Map MenuItems from config */}
                  <MenuItem value='co2'>CO2</MenuItem>
                  <MenuItem value='humidity'>Mitrums</MenuItem>
                  <MenuItem value='temp'>Temperatūra</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className={classes.thresholdConditionGrid}>
              <FormControl className={classes.formControl}>
                <InputLabel id='sensor-alert-threshold'>Nosacījums</InputLabel>
                <Select
                  labelId='sensor-alert-threshold'
                  id='sensor-threshold-condition'
                  value={thresholdCondition}
                  onChange={handleThresholdConditionChange}>
                  {/* TODO: Map MenuItems from config */}
                  <MenuItem value='gt'>Vairāk par</MenuItem>
                  <MenuItem value='eq'>Vienāds ar</MenuItem>
                  <MenuItem value='lt'>Mazāk par</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id='sensor-value'
                  label='Vērtība'
                  type='number'
                  defaultValue='400'
                  onChange={handleConditionValueChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='center' className={classes.alertDataRuleGrid}>
            <Typography component={'span'} variant='h6' style={{ margin: '10px' }}>
              Brīdinājumu likumi
            </Typography>
            <List className={classes.root}>
              <ListItem>
                <Typography component={'span'} variant='overline' className={classes.alertRule}>
                  <Typography component={'span'} variant='overline' style={{ fontWeight: 'bold' }}>
                    Datums no:{' '}
                  </Typography>
                  {getFormattedDateTime(selectedFromDate)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component={'span'} variant='overline' className={classes.alertRule}>
                  <Typography component={'span'} variant='overline' style={{ fontWeight: 'bold' }}>
                    Datums līdz:{' '}
                  </Typography>
                  {getFormattedDateTime(selectedToDate)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component={'span'} variant='overline' className={classes.alertRule}>
                  <Typography component={'span'} variant='overline' style={{ fontWeight: 'bold' }}>
                    Telpa:{' '}
                  </Typography>
                  {room}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component={'span'} variant='overline' className={classes.alertRule}>
                  <Typography component={'span'} variant='overline' style={{ fontWeight: 'bold' }}>
                    Sensora tips:{' '}
                  </Typography>
                  {sensorType}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component={'span'} variant='overline' className={classes.alertRule}>
                  <Typography component={'span'} variant='overline' style={{ fontWeight: 'bold' }}>
                    Nosacījums:{' '}
                  </Typography>{' '}
                  {thresholdCondition} {conditionValue}
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid container justify='center' className={classes.alertDataRuleGrid}>
            <Typography component={'span'} variant='body2'>
              {`?dateFrom=${selectedFromDate}&dateTo=${selectedToDate}&room=${room}&type=${sensorType}&condition=${thresholdCondition}-${conditionValue}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container className={classes.alertDataDisplayGrid}>
            <Paper className={classes.paperRoot}>
              <Table columns={columnsConfig} data={alertData ? alertData : mockedData} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
