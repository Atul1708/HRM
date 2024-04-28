import React, { useState } from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authprovider";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const [activeField, setActiveField] = useState(0);

  const handleFieldClick = (fieldIndex) => {
    setActiveField(fieldIndex);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // const handleItemClick = (itemName) => {
  //   // console.log("Clicked:", itemName);
  //   setActiveItem(itemName);
  // };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Techstile</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li
            className={`menuItem ${
              activeField === 0 ? "active" : ""
            }`}
            onClick={() => {
              handleFieldClick(0);
              navigate("/");
            }}
          >
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">Lists</p>
          <li
            className={`menuItem ${
              activeField === 1 ? "active" : ""
            }`}
            onClick={() => {
              handleFieldClick(1);
              navigate("/employees");
            }}
          >
            <PeopleIcon className="icon" />
            <span>Employee</span>
          </li>
          <li
            className={`menuItem ${
              activeField === 2 ? "active" : ""
            }`}
            onClick={() => {
              handleFieldClick(2);
              navigate("/attendance");
            }}
          >
            <FactCheckOutlinedIcon className="icon" />
            <span>Attendance</span>
          </li>
          <li
            className={`menuItem ${
              activeField === 3 ? "active" : ""
            }`}
            onClick={() => {
              handleFieldClick(3);
              navigate("/events");
            }}
          >
            <CalendarMonthIcon className="icon" />
            <span>Events</span>
          </li>
          <div className="last-section">
            <li onClick={() => {
              handleLogout();
              navigate("/");
            }} className={activeField === 4  ? "menuItem active" : "menuItem"}>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
