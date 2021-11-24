import * as React from 'react';
// import Link from '@mui/material/Link';
import { Link } from '@material-ui/core';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import Title from './Title';
import '../App.css'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Stats({data,...props}) {
  console.log("Show the results:")
  // console.log(props);
  // const {data} = props;
  console.log('We are loading from here')
  console.log(data);
  console.log(typeof data)
  return (
    <div className="App">
    <React.Fragment>
      <Title>Recent Activity</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Shortened URL</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Visited</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* {data.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.get_username}</TableCell>
              <TableCell>{d.shortURL}</TableCell>
              <TableCell>{d.date_created}</TableCell>
              <TableCell align="right">{d.visited}</TableCell>
            </TableRow>
          ))} */}
          {/* {rows.map((row) => (
            <TableRow key={id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
    </div>
  );
}