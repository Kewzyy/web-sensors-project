import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  formControl: {
    width: 200,
    minWidth: 100,
    paddingRight: 8,
    paddingLeft: 8
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    // flexDirection: 'column',
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxes: {
    paddingTop: 16,
    paddingLeft: 24
  }
}))
