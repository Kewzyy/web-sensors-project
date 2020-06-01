import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { styles } from './styles';

const columns = [
  { id: 'room', label: 'Telpa', minWidth: 170 },
  { id: 'type', label: 'Sensora tips', minWidth: 100 },
  {
    id: 'date',
    label: 'Datums',
    minWidth: 170,
  },
  {
    id: 'time',
    label: 'Laiks',
    minWidth: 170,
  },
  {
    id: 'value',
    label: 'Vērtība',
    minWidth: 170,
  },
];

function createData(room, type, date, time, value) {
  return { room, type, date, time, value };
}




export function AlertDataDisplay() {
  const classes = styles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [
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

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
