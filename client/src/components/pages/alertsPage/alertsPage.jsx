import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { styles } from './styles';

import { AlertDataDisplay } from './alertDataDisplay/index';

function AlertsPage() {
  const classes = styles();

  const [secondary, setSecondary] = React.useState(false);

  const [sensor, setSensor] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [sensorType, setSensorType] = React.useState('');
  const [thresholdCondition, setThresholdCondition] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [spacing, setSpacing] = React.useState(2);

  const handleSensorChange = (event) => {
    setSensor(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const handleSensorTypeChange = (event) => {
    setSensorType(event.target.value);
  };
  const handleThresholdConditionChange = (event) => {
    setThresholdCondition(event.target.value);
  };

  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date('2020-04-18T21:11:54'));
  const [selectedToDate, setSelectedToDate] = React.useState(new Date('2020-05-18T21:11:54'));
  const handleDateFromChange = (event) => {
    setSelectedFromDate(event.target.value);
  };
  const handleDateToChange = (event) => {
    setSelectedToDate(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Typography variant="h5" justify="center" className={classes.title}>
          Brīdinājumu pārskats
        </Typography>
      </Grid>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <form className={classes.datetimeContainer} noValidate>
              <TextField
                id="datetime-local-from"
                label="Datums no"
                type="datetime-local"
                defaultValue="2020-05-24T10:30"
                className={classes.dateTimeTextField}
                onChange={handleDateFromChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <form className={classes.datetimeContainer} noValidate>
              <TextField
                id="datetime-local-to"
                label="Datums līdz"
                type="datetime-local"
                defaultValue="2020-05-24T10:30"
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
          <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="open-select-label-room">Telpa</InputLabel>
                <Select
                  labelId="open-select-label-room"
                  id="open-select-room"
                  value={room}
                  onChange={handleRoomChange}
                >
                  <MenuItem value="Servertelpa">Servertelpa</MenuItem>
                  <MenuItem value="Videonovērošana">Videonovērošana</MenuItem>
                  <MenuItem value="14.telpa">14.telpa</MenuItem>
                  <MenuItem value="Dispečeru telpa">Dispečeru telpa</MenuItem>
                  <MenuItem value="13.telpa">13.telpa</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="open-select-label-sensor">Sensora tips</InputLabel>
                <Select
                  labelId="open-select-label-sensor"
                  id="open-select-sensor"
                  value={sensor}
                  onChange={handleSensorChange}
                >
                  <MenuItem value="co2">CO2</MenuItem>
                  <MenuItem value="moisture">Mitrums</MenuItem>
                  <MenuItem value="temperature">Temperatūra</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className={classes.thresholdConditionGrid}>
              <FormControl className={classes.formControl}>
                <InputLabel id="sensor-alert-threshold">Nosacījums</InputLabel>
                <Select
                  labelId="sensor-alert-threshold"
                  id="sensor-threshold-condition"
                  value={thresholdCondition}
                  onChange={handleThresholdConditionChange}
                >
                  <MenuItem value="lessthan">Mazāk par</MenuItem>
                  <MenuItem value="equal">Vienāds ar</MenuItem>
                  <MenuItem value="morethan">Vairāk par</MenuItem>
                </Select>

              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id="sensor-value"
                  label="Vērtība"
                  type="number"
                />
              </FormControl>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center" className={classes.alertDataRuleGrid}>
            <Typography variant="h6" justify="center">
              Datums no: <nbsp />
              {new Date(selectedFromDate).toString()}
            </Typography>
            <Typography variant="h6" justify="center">
              Datums līdz: <nbsp />
              {new Date(selectedToDate).toString()}
            </Typography>
          </Grid>

          <Grid container justify="center" className={classes.alertDataRuleGrid}>
            <Typography variant="h6" justify="center">
              Search query:
            </Typography>
            <Typography variant="h6" justify="center">

            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container className={classes.alertDataDisplayGrid}>
            <AlertDataDisplay />
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default AlertsPage;
