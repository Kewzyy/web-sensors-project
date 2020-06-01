import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  title: {
    margin: "50px",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  thresholdConditionGrid: {
    border: '1px solid #ced4da',
    marginLeft: "30px",
  },
  alertDataRuleGrid: {
    border: '1px solid #ced4da',
    margin: "20px",
  },
  alertDataDisplayGrid: {
    margin: "20px",
  },
  datetimeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px',
  },
  dateTimeTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));