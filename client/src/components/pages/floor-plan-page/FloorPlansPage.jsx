import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {green} from "@material-ui/core/colors";
import Button from '@material-ui/core/Button';
import {styles} from './styles';

import { getDistinctRooms, addNewRoom } from '../../../apis/requests'

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color='default' {...props} />)

export const FloorPlansPage = () => {
    const classes = styles();
    const [selectedIndex, setSelectedIndex] = React.useState(false);

    const [distinctRoomData, setDistinctRoomData] = React.useState([])
    const [roomNames, setRoomNames] = React.useState([])
    const [roomTypes, setRoomTypes] = React.useState([])

    const handleRoomListItemClick = (selectedRoomName, index) => {
        setSelectedIndex(index);

        var roomTypes = [];
        distinctRoomData.forEach(function(currentRoomObj, i){
            if(currentRoomObj.room === selectedRoomName){
                return roomTypes = currentRoomObj.types;
            }
        });
        setRoomTypes(roomTypes);
    }

    const [newRoomName, setNewRoomName] = React.useState();
    const [sensorInsertedConfirmationFieldValue, setSensorInsertedConfirmationFieldValue] = React.useState('');

    const handleAddingNewRoom = (newRoomName, newSensorTypeState) => {
        console.log("newRoomName", newRoomName);
        console.log("newSensorTypeState", newSensorTypeState);

        var sensorTypes = []
        if(newSensorTypeState.checkedCO2) sensorTypes.push("co2")
        if(newSensorTypeState.checkedMITRUMS) sensorTypes.push("humidity")
        if(newSensorTypeState.checkedTEMP) sensorTypes.push("temp")

        sensorTypes.forEach(async (sensorType, index) => {
            addNewRoom(newRoomName, sensorType)
                .then((response: any) => {
                    console.log("response", response)
                    if (response.status === 200) {
                        setSensorInsertedConfirmationFieldValue("Room inserted OK")
                    }
                })
                .catch((error) => {
                    setSensorInsertedConfirmationFieldValue("Room insert error -> see logs")
                    console.log('Error while adding new room ', error)
                })
        })
    }

    const handleNewSensorNameChange = event => {
        setNewRoomName(event.target.value)
    }

    const [newSensorTypeState, setNewSensorTypeState] = React.useState({
        checkedCO2: false,
        checkedMITRUMS: false,
        checkedTEMP: false,
    });

    const handleChangeCheck = (event) => {
        setNewSensorTypeState({ ...newSensorTypeState, [event.target.name]: event.target.checked });
    };

    React.useEffect(() => {
      getDistinctRooms()
        .then((response) => {
          var roomNames = []
          response.data.map(roomObj => (
            roomNames.push(roomObj.room)
          ))
          setRoomNames(roomNames)
          setDistinctRoomData(response.data)
        }).catch((err) => {
          console.log('Get RoomName Data Err', err)
        });
    }, [])

    return (
        <React.Fragment>
            <div className={classes.mainContainer}>
                <div className={classes.leftBox}>
                    <h3>Telpas ar sensoriem</h3>
                    <div className={classes.root2}>
                        <List component="nav" aria-label="secondary mailbox folder">
                            {roomNames.map((roomName, index) =>
                                <ListItem
                                    key={roomName+index}
                                    button
                                    selected={selectedIndex === (index)}
                                    value={roomName}
                                    onClick={() => handleRoomListItemClick(roomName, index)}
                                >
                                    <ListItemText primary={roomName} />
                                </ListItem>
                            )}
                        </List>
                    </div>

                    <h4>Telpā esošie sensori:</h4>
                    <div>
                        <List component="nav" aria-label="secondary mailbox folder">
                            {roomTypes.map((roomType, index) =>
                                <ListItem key={roomType+index}>
                                    <ListItemText primary={roomType} />
                                </ListItem>
                            )}
                        </List>
                    </div>

                    <h3>Pievienot telpu</h3>
                    <div className={classes.whiteBox}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                id="new-sensor-name"
                                label="Telpas nosaukums"
                                onChange={handleNewSensorNameChange}
                            />
                            <FormControlLabel
                                control={<GreenCheckbox checked={newSensorTypeState.checkedCO2} onChange={handleChangeCheck} name="checkedCO2" />}
                                label="CO2"
                            />
                            <FormControlLabel
                                control={<GreenCheckbox checked={newSensorTypeState.checkedMITRUMS} onChange={handleChangeCheck} name="checkedMITRUMS" />}
                                label="Mitrums"
                            />
                            <FormControlLabel
                                control={<GreenCheckbox checked={newSensorTypeState.checkedTEMP} onChange={handleChangeCheck} name="checkedTEMP" />}
                                label="Temperatūra"
                            />
                            <div className={classes.root}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleAddingNewRoom(newRoomName, newSensorTypeState)}
                                >
                                    Saglabāt
                                </Button>
                                <div>{sensorInsertedConfirmationFieldValue}</div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={classes.imgFloor1}>
                    <h3>1.stāva plāns</h3>
                </div>
                <div className={classes.imgFloor2}>
                    <h3>2.stāva plāns</h3>
                </div>
            </div>
        </React.Fragment>
    );
}