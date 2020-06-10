import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200
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
    marginLeft: 120,
    marginRight: 120,
    marginTop: 30,
    marginBottom: 50,
    height: '30vh',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
    paddingBottom: 50,
  },
  graphBox: {
    backgroundColor: '#F5F5F5',
    marginLeft: 120,
    marginRight: 120,
    marginTop: 30,
    marginBottom: 50,
    height: '100vh',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
    paddingBottom: 50,
  },
  pickers: {
    display: 'flex',
  },
}))
