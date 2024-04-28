import './Table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const List = () => {
    const rows= [
            {
              id:"1",
              name: "Kunal Sinha",
              email: "kunal11204@gmail.com",
              password: "$2b$10$QC4y4qtcwdkF8kZpVVwOBONLXtBJ5CxyNoXsQECTCCAfov8g12Zti",
              jobrole: "Backend",
              numberLong: "8140145325",
              status: "Pending",
            },
            {
              id:"2",
              name: "Savan Mir",
              email: "savanmir4@gamil.com",
              password: "$2b$10$NUxp2w54ZzUDTCW5u6YiKuu83HU.pa0cEXxJ0BaBc2anYgJMnEW/O",
              jobrole: "UI/UX",
              numberLong: "8140145325",
              status: "Completed",
            },
            {
              id:"3",
              name: "Atul Sharma",
              email: "atulsh1708@gmail.com",
              password: "$2b$10$JXULxsL/M62NGod4GQ8XTO2Ov570tsLWwaxbzGKkIpk5KNZvtNFWu",
              jobrole: "FrontEnd",
              numberLong: "8140145325",
              status: "Completed",
            },
            {
              id:"4",
              name: "Sharvan",
              email: "parkhisharvan@gmail.com",
              password: "$2b$10$Q/0F8tAv8iBZ6ONM.b5pZeQdz/xp1mNtKLylR1P/nfAPMKCDOty2u",
              jobrole: "Django",
              numberLong: "8140145325",
              status: "Pending",
            }    
    ];
  return (
    <TableContainer component={Paper} className='table'>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className='tableCell'>Employee ID</TableCell>
          <TableCell className='tableCell'>Employee Name</TableCell>
          <TableCell className='tableCell'>Employee Email</TableCell>
          <TableCell className='tableCell'>Employee Role</TableCell>
          <TableCell className='tableCell'>Employee number</TableCell>
          <TableCell className='tableCell'>Project Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className='tableCell'>{row.id}</TableCell>
            <TableCell className='tableCell'>{row.name}</TableCell>
            <TableCell className='tableCell'>{row.email}</TableCell>
            <TableCell className='tableCell'>{row.jobrole}</TableCell>
            <TableCell className='tableCell'>{row.numberLong}</TableCell>
            <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List;
