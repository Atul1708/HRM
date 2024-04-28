import './Widgets.scss'
import { useEffect, useState } from 'react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Endpoint from '../../api';


const jobRoleCounts = {
    backend: 0,
    frontend: 0,
    'ui/ux': 0,
  };
let onLeaveCount = 0;
  
const handleData = async (setUserData) => {
    const api = `${Endpoint}/api/getalluser/`;
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': true,
        },
      });
      const data = await response.json();
    //   console.log(data);
    //   console.log(data.DataLength);
      const datalength = data.DataLength;
      data.employee.map((employee) => {
        const jobRoleLowerCase = employee.jobrole.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        if (jobRoleLowerCase === 'backend') {
            jobRoleCounts.backend++;
          } else if (jobRoleLowerCase === 'frontend') {
            jobRoleCounts.frontend++;
          } else if (jobRoleLowerCase === 'ui/ux') {
            jobRoleCounts['ui/ux']++;
          }
      })
    //   console.log('Job Role Counts:', jobRoleCounts);
    //   console.log(data.employee.jobrole);
    //   console.log(datalength);
      setUserData(datalength);
    } catch (err) {
      console.error('error', err);
    }
  };

  const totalAttendance = async (setAttendace) => {
    const api = `${Endpoint}/api/getattendance/`;
    try {
        const response = await fetch(api,{
            method: 'GET',
            headers: {
          'ngrok-skip-browser-warning': true,
            },
        })
        const data = await response.json();
        const totalAttendanceNum = data.DataLength
        // console.log(totalAttendanceNum);
        setAttendace(totalAttendanceNum);
    }
    catch(error) {
        console.error("error ocurred",error);
    }
  }
const Widgets = ({ type }) => { 
         
        const [userData, setUserData] = useState([]);
        const [attendes,setAttendace] = useState("");

        
        onLeaveCount = userData - attendes;
        onLeaveCount = onLeaveCount > 0 ? onLeaveCount : "0"
        const [role, setRole] = useState([]);

        useEffect(() => {
            handleData(setUserData);
            totalAttendance(setAttendace);
          }, []);
    let data;

    switch (type) {
        case "user":
            data = {
                title: "Total Employee",
                amount: userData,
                icon: <PersonOutlineOutlinedIcon className='icon'
                    style={{
                        color: "crimson",
                        backgroundColor: "rgba(255,0,0,0.2)"
                    }}
                />
            };
            break;

        case "earning":
            data = {
                title: "Today's Attendance",
                amount: attendes,
                icon: <BadgeOutlinedIcon className='icon'
                    style={{
                        color: "green",
                        backgroundColor: "rgba(0,128, 0,0.2)"
                    }} />
            };
            break;
        case "balance":
            data = {
                title: "On Leave",
                amount: onLeaveCount,
                icon: <AddHomeOutlinedIcon className='icon'
                    style={{
                        color: "purple",
                        backgroundColor: "rgba(128,0,128,0.2)"
                    }}
                />
            };
            break;
        default:
            break;
    }
    return (
        <div className='widget'>
            <div className='left'>
                <span className='title'>{data.title}</span>
                <span className='count'> {data.amount} </span>
            </div>
            <div className='right'>
                {data.icon}
            </div>
        </div>
    )
}

export default Widgets
