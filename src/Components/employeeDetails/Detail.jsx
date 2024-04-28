import React, { useState, useEffect } from 'react';
import './Detail.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userCol, userRows } from './data';
import Endpoint from '../../api';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const Detail = () => {
  const [userData, setUserData] = useState([]);

  const handleData = async () => {
    const api = `${Endpoint}/api/getattendance/`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': true,
        },
      });
      const data = await response.json();
      const result = data.attendance;
      const updatedRows = result.map((attend, index) => ({
        ...attend,
        id: index + 1,
      }));
      setUserData(updatedRows);
    } catch (err) {
      console.error('error', err);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className='table'>
      <Sidebar />
      <div className='tableContainer'>
        <Navbar />
        <div className='tableContent' style={{ width: '100%' }}>
          <DataGrid
            rows={userData}
            columns={userCol}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            rowId={(row) => row.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
