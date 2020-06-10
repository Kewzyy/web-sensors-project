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
} from '@material-ui/core'

import { useStyles } from './styles'
import { anchorRef } from '../../../constants'
import { DatePicker } from 'components/blocks/Datepicker'
import { sensorConfig as sensorTypes, detailConfig } from '../../../config'
import { useRecoilValue } from 'recoil'
import { dateTimeRangeState } from '../../../atoms'
import { Chart } from 'components/blocks/Chart'

export const DataOverviewPage = () => {
  const classes = useStyles()
  const [selectedSensor, setSelectedSensor] = React.useState('')
  const [selectedDetail, setSelectedDetail] = React.useState('')
  const [checkBoxState, setCheckBoxState] = React.useState({
    showAvg: false,
    showDiff: false,
  })
  const dateData = useRecoilValue(dateTimeRangeState)
  const handleCheck = e => {
    setCheckBoxState({
      ...checkBoxState,
      [e.target.name]: e.target.checked,
    })
  }

  console.log('DataOverviewPage -> dateData', dateData)
  console.log('DataOverviewPage -> selectedSensor', selectedSensor)
  console.log('DataOverviewPage -> checkBoxState', checkBoxState)
  console.log('DataOverviewPage -> selectedDetail', selectedDetail)
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
            <InputLabel> Detalizācijas pakāpe</InputLabel>
            <Select
              MenuProps={anchorRef}
              value={selectedDetail}
              onChange={e => setSelectedDetail(e.target.value)}>
              {detailConfig &&
                detailConfig.map(detail => {
                  return (
                    <MenuItem key={`${detail.name}-key`} value={detail.value}>
                      {detail.name}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkBoxState.showDiff}
                    onChange={handleCheck}
                    name='showDiff'
                  />
                }
                label='Starpība ar iepriekšējo periodu'
              />
            </FormGroup>
          </FormControl>
        </div>
        <Chart></Chart>
      </div>
    </React.Fragment>
  )
}
