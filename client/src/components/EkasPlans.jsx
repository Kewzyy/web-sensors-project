import React, {useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {green} from "@material-ui/core/colors";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    root2: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    whiteBox: {
        width:'100%',
        maxWidth:360,
        backgroundColor: 'white',
},
    mainContainer: {
        marginLeft:120,
        marginRight:120,
        marginTop:30,
        marginBottom:50,
        height: '35vh',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop:50,
        paddingBottom:50,
    },
    leftBox: {
        width:'35vh',
        height:'1020px',
        backgroundColor:'#F5F5F5'
        ,float:'left',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 100,
    },
    imgFloor1: {
        backgroundImage: "url(" + "http://localhost:3000/img/floor1.png" + ")",
        width:'700px',
        height:'499px',
        backgroundColor: '#EEE',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        float:'right',
        paddingLeft: 20,
    },
    imgFloor2: {
        backgroundImage: "url(" + "http://localhost:3000/img/floor2.png" + ")",
        width:'700px',
        height:'499px',
        backgroundColor: '#EEE',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        float:'right',
        paddingLeft: 20,
        marginTop:20,
    }

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

export default function BuildingPlan() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log('clicked!' + [index])
    };
        const [state, setState] = React.useState({
            checkedG: false,
            checkedH: false,
            checkedI: false,
        });

        const handleChangeCheck = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };

return (
    <React.Fragment>
        <CssBaseline />
<div className={classes.mainContainer}>
    <h1>Ēkas plāns un sensori</h1>
<div className={classes.leftBox}>
<h3>Telpas ar sensoriem</h3>
    <div className={classes.root2}>
        <List component="nav" aria-label="secondary mailbox folder">
            <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
            >
                <ListItemText primary="Servertelpa" />
            </ListItem>
            <ListItem
                button
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
            >
                <ListItemText primary="Videonovērošana" />
            </ListItem>
            <ListItem
                button
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
            >
                <ListItemText primary="14.telpa" />
            </ListItem>
            <ListItem
                button
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
            >
                <ListItemText primary="Dispečeru telpa" />
            </ListItem>
            <ListItem
                button
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
            >
                <ListItemText primary="13.telpa" />
            </ListItem>
        </List>
    </div>
    <h3>Pievienot telpu</h3>
    <div className={classes.whiteBox}>
    <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Telpas nosaukums" />

    <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChangeCheck} name="checkedG" />}
        label="CO2"
    />
    <FormControlLabel
        control={<GreenCheckbox checked={state.checkedH} onChange={handleChangeCheck} name="checkedH" />}
        label="Mitrums"
    />
    <FormControlLabel
        control={<GreenCheckbox checked={state.checkedI} onChange={handleChangeCheck} name="checkedI" />}
        label="Temperatūra"
    />
        <div className={classes.root}>
            <Button variant="outlined">Saglabāt</Button>
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