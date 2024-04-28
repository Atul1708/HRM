import React, { useState } from 'react'
import "./Home.scss";
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from "../../Components/Sidebar/Sidebar"
import Widgets from '../../Components/widgets/Widgets';
import Charts from '../../Components/charts/Charts';
import Job from '../../Components/Job/Job';
import List from '../../Components/table/Table';
import Admin from '../../Components/admin/Admin';
import { useAuth } from '../../Components/Authprovider';
import CalendarComp from '../../Components/Calendar/CalendarComp';
import WidgetsContainer from '../../Components/widgets/WidgetContainer';
const Home = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <>
        <div className='home'>
          <Sidebar />
          <div className='homeContainer'>
            <Navbar />
            <div className='widgets'>
            <WidgetsContainer />
            </div>

            <div className='charts'>
              {/* <CalendarComp /> */}
              <Job />
              <Charts aspect={2 / 1} title="last 6 month data" />
            </div>
          </div>
        </div>
      </>
    )
  }

  return <Admin />;
}

export default Home;
