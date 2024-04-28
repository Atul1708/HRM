import { useState, useEffect } from 'react';
import './Single.scss';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Charts from "../../Components/charts/Charts";
import List from "../../Components/table/Table";
import axios from 'axios';
import Endpoint from '../../api';
import { useParams } from 'react-router-dom';

const Single = () => {
  const { userId } = useParams();
  console.log(userId);
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);
  const fetchUserData = async (userId) => {
    const api = `${Endpoint}/api/getuser/${userId}`;
  
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': true,
        },
      });
      const data = await response.json();
  
      setEmployeeData(data); // Store the fetched data in state
      console.log(data);
    } catch (err) {
      if (err.status === 404) {
        alert('The resource you are trying to access does not exist.');
      } else if (err.status === 401) {
        alert('You are not authorized to access this resource.');
      } else {
        console.error('error', err);
      }
    }
  };


  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">

          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="itemImg" /> */}
              <div className="details">
                <h2 className="itemTitle"></h2>

                <div className="detailItems">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{employeeData.name}</span>
                </div>
                <div className="detailItems">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{employeeData.email}</span>
                </div>
                <div className="detailItems">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{employeeData.phone}</span>
                </div>
                <div className="detailItems">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{employeeData.jobrole}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Charts aspect={3 / 1} title="Employee Attendace (last 6 months)" />
          </div>
        </div>
        {/* <div className="bottom">
        <h1 className="title">Details of other</h1>
            <List />
        </div> */}
      </div>
    </div>
  )
}

export default Single
