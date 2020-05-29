import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {styles} from './styles';

const useStyles = makeStyles ((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '20vh',
        marginRight: 10,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    box: {
        marginLeft:120,
        marginRight:120,
        marginTop:30,
        marginBottom:50,
        height: '30vh',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop:50,
        paddingBottom:50,
    },
    graphBox: {
        backgroundColor: '#F5F5F5',
        marginLeft:120,
        marginRight:120,
        marginTop:30,
        marginBottom:50,
        height: '100vh',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop:50,
        paddingBottom:50
    },
}));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function SimpleContainer() {
    const classes = useStyles();
    const [sensor, setSensor] = React.useState('');
    const handleChange = (event) => {
        setSensor(event.target.value);
    };
    const [room, setRoom] = React.useState('');
    const handleChangeRoom = (event) => {
        setRoom(event.target.value);
    };
    const [state, setState] = React.useState({
        checkedG: false,
        checkedH: false,
    });

    const handleChangeCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.box}>
                <h1>Datu pārskats</h1>
                <table>
                    <tbody>
                    <td><form className={classes.container} noValidate>
                        <TextField
                            id="datetime-local"
                            label="Laiks"
                            type="datetime-local"
                            defaultValue="2020-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form></td>
                    <td>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Sensors</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sensor}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>CO2</MenuItem>
                            <MenuItem value={2}>Mitrums</MenuItem>
                            <MenuItem value={3}>Temperatūra</MenuItem>
                        </Select>
                    </FormControl>
                    </td>
                    <td>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Telpa</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={room}
                            onChange={handleChangeRoom}
                        >
                            <MenuItem value={4}>Servertelpa</MenuItem>
                            <MenuItem value={5}>Videonovērošana</MenuItem>
                            <MenuItem value={6}>14.telpa</MenuItem>
                            <MenuItem value={7}>Dispečeru telpa</MenuItem>
                            <MenuItem value={8}>13.telpa</MenuItem>
                        </Select>
                    </FormControl>
                    </td>
                    <td>
                        <FormGroup row>
                            <FormControlLabel
                                control={<GreenCheckbox checked={state.checkedG} onChange={handleChangeCheck} name="checkedG" />}
                                label="Vidējais patēriņš"
                            />
                            <FormControlLabel
                                control={<GreenCheckbox checked={state.checkedH} onChange={handleChangeCheck} name="checkedH" />}
                                label="Patēriņa salīdzinājums"
                            />
                        </FormGroup>
                    </td>
                    </tbody>
                </table>
            </div>
            <div className={classes.graphBox}>
                <h2>Te būs grafiks</h2>
            </div>
            <p>{sensor}</p>
            <p>{room}</p>

        </React.Fragment>
    );
}