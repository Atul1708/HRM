import {useState, useEffect } from 'react';
import './Datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userCol, userRows } from './data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Endpoint from '../../api';

const Datatable = () => {

 const [userData, setUserData] = useState([ ]);

 const handleData = async () => {
    const api = `${Endpoint}/api/getalluser/`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': true,
        },
      });
      const data = await response.json();
      // console.log(data);
      const dataByApi = data.employee.map((user, index) => ({
        ...user,
        // id: index + 1,
        id: user._id,
      }));
      setUserData(dataByApi);
    } catch (err) {
      console.error('error', err);
    }
 }    

 useEffect(() => {
    handleData();
 },[])

 const handleDelete = async (userId) => {
    try {
      // Make the DELETE request to the API endpoint
      const api = `${Endpoint}/api/deleteUser/${userId}`;
      const response = await axios.delete(api);

      // If the deletion is successful, update the 'userData' state to remove the deleted user
      if (response.status === 204) {
        setUserData((prevUserData) => prevUserData.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error, show an error message, etc.
    }
  };

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 150, renderCell: (params) => {
              const userId = params.row.id;
              const userEmail = params.row.email;
                return (
                    <div className="cellAction">
                     <Link to={`/employees/${userId}`} style={{textDecoration:"none"}}>
                    <div className="viewButton">View</div>
                     </Link>
                    <div className="deleteButton" onClick={() => handleDelete(userId)}>Delete</div>
                    {/*  onClick={handleDelete(userId)} */}
                </div>
                )
            }
        }
    ]

    return (
        <div className='datatable'>
        <div className="datatableTitle">
        {/* <button onClick={handleData}>get</button> */}
       
            Add New Employees 
            <Link to="/employees/new" style={{textDecoration:"none"}} className='link'> 
                Add New
            </Link>
        </div>
            <DataGrid
                rows={userData}
                columns={userCol.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                rowId={(row) => row.id}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable
