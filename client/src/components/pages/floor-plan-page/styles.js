import {makeStyles} from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    root2: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: theme.palette.background.paper,
    },
    whiteBox: {
        width:'100%',
        maxWidth:280,
        backgroundColor: 'white',
        paddingLeft:10,
        paddingRight:10,
    },
    mainContainer: {
        marginRight:100,
        marginTop:30,
        marginBottom:50,
        width: '1200px',
        height: '35vh',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop:50,
        paddingBottom:50,
        position:'relative',
    },
    leftBox: {
        width:'100%',
        maxWidth:300,
        height:'1020px',
        backgroundColor:'#F5F5F5',
        float:'left',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 100,
    },
    imgFloor1: {
        backgroundImage: `url('/img/floor-plan/floor1.png')`,
        width:'700px',
        height:'499px',
        backgroundColor: '#EEE',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        float:'right',
        paddingLeft: 20,
    },
    imgFloor2: {
        backgroundImage: `url('/img/floor-plan/floor2.png')`,
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