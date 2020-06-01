import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { styles } from './styles';
import { getFormattedDateTime } from './dateFormatter';
import { AlertDataDisplay } from './alertDataDisplay/index';

const formatQueryString = (string) => {
    console.log("string to format: ", string);
    return string.trim();
}

function createData(room, type, date, time, value) {
  return { room, type, date, time, value };
}

function AlertsPage() {

  const dummyData = [
    createData('Servertelpa', 'co2', '01/17/2020', '10:45:29 AM', '400'),
    createData('Servertelpa', 'co2', '02/17/2020', '10:45:29 AM', '500'),
    createData('Servertelpa', 'mitrums', '03/17/2020', '10:45:29 AM', '400'),
    createData('Servertelpa', 'co2', '04/17/2020', '10:45:29 AM', '300'),
    createData('Servertelpa', 'co2', '05/17/2020', '10:45:29 AM', '400'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
    createData('Servertelpa', 'co2', '06/17/2020', '10:45:29 AM', '200'),
  ];

  const classes = styles();

  const [sensor, setSensor] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [sensorType, setSensorType] = React.useState('');

  const [thresholdCondition, setThresholdCondition] = React.useState('');
  const [conditionValue, setConditionValue] = React.useState('');

  const [spacing, setSpacing] = React.useState(2);

  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date('2020-01-01T21:11:54'));
  const [selectedToDate, setSelectedToDate] = React.useState(new Date('2020-01-10T21:11:54'));

  const handleSensorChange = (event) => {
    setSensor(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const handleThresholdConditionChange = (event) => {
    setThresholdCondition(event.target.value);
  };
  const handleDateFromChange = (event) => {
    setSelectedFromDate(event.target.value);
  };
  const handleDateToChange = (event) => {
    setSelectedToDate(event.target.value);
  };
  const handleConditionValueChange = (event) => {
    setConditionValue(event.target.value);
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
                  <MenuItem value="Videonoverosanas telpa">Videonovērošana</MenuItem>
                  <MenuItem value="14telpa">14.telpa</MenuItem>
                  <MenuItem value="Dispecerutelpa">Dispečeru telpa</MenuItem>
                  <MenuItem value="13telpa">13.telpa</MenuItem>
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
                  <MenuItem value="humidity">Mitrums</MenuItem>
                  <MenuItem value="temp">Temperatūra</MenuItem>
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
                  onChange={handleConditionValueChange}
                />
              </FormControl>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center" className={classes.alertDataRuleGrid}>
            <Typography variant="h6" style={{margin:'10px'}}>Brīdinājumu likumi</Typography>
            <List className={classes.root}>
              <ListItem>
                <Typography variant="overline" className={classes.alertRule}>
                  <Typography variant="overline" style={{fontWeight:'bold'}}>Datums no: </Typography>
                  {getFormattedDateTime(selectedFromDate)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="overline" className={classes.alertRule}>
                  <Typography variant="overline" style={{fontWeight:'bold'}}>Datums līdz: </Typography>
                  {getFormattedDateTime(selectedToDate)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="overline" className={classes.alertRule}>
                  <Typography variant="overline" style={{fontWeight:'bold'}}>Telpa: </Typography>
                  {room}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="overline" className={classes.alertRule}>
                  <Typography variant="overline" style={{fontWeight:'bold'}}>Sensora tips: </Typography>
                  {sensor}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="overline" className={classes.alertRule}>
                  <Typography variant="overline" style={{fontWeight:'bold'}}>Nosacījums: </Typography>
                  {' '}{thresholdCondition}{' '}{conditionValue}
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid container justify="center" className={classes.alertDataRuleGrid}>
            <Typography variant="h6" style={{margin:'10px'}}>Search query</Typography>
            <Typography variant="body2">
                {formatQueryString(`?dateFrom=${getFormattedDateTime(selectedFromDate)}&dateTo=${getFormattedDateTime(selectedToDate)}&room=${room}&sensor=${sensor}&condition=${thresholdCondition}${conditionValue}`)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container className={classes.alertDataDisplayGrid}>
            <AlertDataDisplay data={dummyData}/>
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default AlertsPage;
