import React from 'react'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core'

import { useStyles } from './styles'

export const DataOverviewPage = () => {

// return(
//   <React.Fragment>
//     <div>

//     </div>
//   </React.Fragment>
// )


  return <Typography variant='h3'>Work in progress &#9749;</Typography>

  const classes = useStyles()
  const [sensor, setSensor] = React.useState('')
  const handleChange = event => {
    setSensor(event.target.value)
  }
  const [room, setRoom] = React.useState('')
  const handleChangeRoom = event => {
    setRoom(event.target.value)
  }
  const [state, setState] = React.useState({
    checkedG: false,
    checkedH: false,
  })

  const handleChangeCheck = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  return (
    <React.Fragment>
      <div className={classes.box}>
        <h1>Datu pārskats</h1>
        <div className={classes.pickers}>
          <form className={classes.container} noValidate>
            <TextField
              id='datetime-local'
              label='Laiks'
              type='datetime-local'
              defaultValue='2020-05-24T10:30'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>

          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Sensors</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={sensor}
              onChange={handleChange}>
              <MenuItem value={1}>CO2</MenuItem>
              <MenuItem value={2}>Mitrums</MenuItem>
              <MenuItem value={3}>Temperatūra</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Telpa</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={room}
              onChange={handleChangeRoom}>
              <MenuItem value={4}>Servertelpa</MenuItem>
              <MenuItem value={5}>Videonovērošana</MenuItem>
              <MenuItem value={6}>14.telpa</MenuItem>
              <MenuItem value={7}>Dispečeru telpa</MenuItem>
              <MenuItem value={8}>13.telpa</MenuItem>
            </Select>
          </FormControl>
        </div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedG}
                onChange={handleChangeCheck}
                name='checkedG'
                color='secondary'
              />
            }
            label='Vidējais patēriņš'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedH}
                onChange={handleChangeCheck}
                name='checkedH'
                color='primary'
              />
            }
            label='Patēriņa salīdzinājums'
          />
        </FormGroup>
      </div>
      <div className={classes.graphBox}>
        <h2>Te būs grafiks</h2>
      </div>
      <p>{sensor}</p>
      <p>{room}</p>
    </React.Fragment>
  )
}
