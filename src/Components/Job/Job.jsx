import Endpoint from "../../api";
import { useState, useEffect } from "react";
import "./Job.scss";

const handleData = async (setUserData, setRole) => {
  const api = `${Endpoint}/api/getalluser/`;
  try {
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': true,
      },
    });
    const data = await response.json();
    const datalength = data.DataLength;

    const jobRoleCounts = {
      backend: 0,
      frontend: 0,
      'ui/ux': 0,
    };

    data.employee.forEach((employee) => {
      console.log(employee.jobrole);
      if (employee.jobrole.toLowerCase() === 'backend') {
        jobRoleCounts.backend++;
      } else if (employee.jobrole.toLowerCase() === 'frontend') {
        jobRoleCounts.frontend++;
      } else if (employee.jobrole.toLowerCase() === 'ui/ux') {
        jobRoleCounts['ui/ux']++;
      }
    });
    
    // updating the job role count here
    setRole(jobRoleCounts); 
    setUserData(datalength);
  } catch (err) {
    console.error('error', err);
  }
};

const Job = () => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState([]); // Use state to store job role counts

  useEffect(() => {
    handleData(setUserData, setRole);
  }, []);

  return (
    <div className='job'>
      <h2 className="title">Role </h2>
      <div className="job-title">
        <h4 className="jobrole">frontend developer</h4>
        <p className="counts">{role.frontend}</p> {/* Use role state to display frontend count */}
      </div>
      <div className="job-title">
        <h4 className="jobrole">Backend developer</h4>
        <p className="counts">{role.backend}</p> {/* Use role state to display backend count */}
      </div>
      <div className="job-title">
        <h4 className="jobrole">UI/UX developer</h4>
        <p className="counts">{role['ui/ux']}</p> {/* Use role state to display ui/ux count */}
      </div>
    </div>
  );
};

export default Job;
