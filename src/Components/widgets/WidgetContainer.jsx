// WidgetsContainer.js
import React, { useEffect, useState } from 'react';
import Widgets from './Widgets';
import Endpoint from '../../api';

const WidgetsContainer = () => {
  const [userData, setUserData] = useState([]);

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
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.error('error', err);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Widgets type="user" mainData={userData} />
      <Widgets type="earning" mainData={userData} />
      <Widgets type="balance" mainData={userData} />
    </>
  );
};

export default WidgetsContainer;
