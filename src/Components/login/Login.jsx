import React, { useEffect, useState } from "react";
import "./Login.scss";
import logo from "../../assets/login.png";
import axios from "axios";
// import axios from "../../axois";
import { data } from "../../data";
import Endpoint from "../../api";
// import Welcome from "../Welcome/Welcome";
// import {getLocation} from "../HanldeForm/Handleform";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [curentLocation, setcurentLocation] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [locationData, setLocationData] = useState("");
  const [message, setMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: pass,
    };
    handleCloseError();
    if (email === "" || pass === "") {
      setTimeout(() => {
        setError({ message: "Please fill all the fields" });
      }, 3000);
      return;
    }

    const user = data.find(
      (user) => user.email === email && user.password === pass
    );
    if (user) {
      console.log("Logged in!");
      setLoginSuccess(true);
      props.onLoginSuccess();
      // history.push("/welcome");
    } else {
      setTimeout(() => {
        setError({ message: "Please fill all the fields" });
      }, 3000);
      setEmail("");
      setPass("");
    }

    const userDataJson = JSON.stringify(userData);
    // console.log(userDataJson);

    // calling login api
    loginApi(email, pass);
    // user information
    // gettingData(email);
    // location.
    try {
      const locationData = await getLocation();
      if (locationData && locationData.cityName) {
        setLocationData(locationData);
        sendCityName(locationData.cityName);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleCloseError = () => {
    setError(null);
  };
  const loginApi = (email, pass) => {
    const url = `${Endpoint}/api/login`;
    const payload = {
      email: email,
      password: pass,
    };
    // const payLoadJson = JSON.stringify(payload)
    // console.log(payLoadJson);
    axios
      .post(url, payload)
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        // setError(err.data)
        console.error(err);
      });
  };

  const gettingData = (email) => {
    const url =
      `${Endpoint}/api/getuser`;

    axios
      .get(url, { params: { email } })
      .then((response) => {
        const gotData = response.data;
        setUserData(gotData);
        // setError(null);
      })
      .catch((error) => {
        if (error.response) {
          // Server returned an error response
          console.error("Server Error:", error.response.data);
          setTimeout(() => {
            setError({  message: "Error fetching user data. Please try again later.", });
          }, 3000);
         
        } else if (error.request) {
          // The request was made but no response received
          console.error("Network Error:", error.request);
          setTimeout(() => {
            setError({  message: "Network error. Please check your internet connection.", });
          }, 3000);
          
        } else {
          // Something else happened
          console.error("Unknown Error:", error.message);
          setTimeout(() => {
            setError({   message: "An unknown error occurred. Please try again later.", });
          }, 3000);
        }
      });
  };

  const sendCityName = (location) => {
    const url = `${Endpoint}/api/location`;
    const data = { location };
    axios
      .post(url, data)
      .then((res) => {
        const locdata = res.data;
        // console.log("cityName sent successfully:", res.data);
        const { location } = locdata.loc;
        console.log(location);
      })
      .catch((err) => {
        setTimeout(() => {
          setError(err.data);
        console.error("error ", err);
      });
        }, 3000);
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setcurentLocation({ latitude, longitude });
          const apiKey = "b18bdaf5b1abb97ac271d680a7461b59";
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
          axios
            .get(url)
            .then((res) => {
              //   console.log(res.data);
              const cityName = res.data.name;
              // console.log(cityName);
              resolve({ latitude, longitude, cityName });
            })
            .catch((error) => {
              setError(err.data);
              reject(error);
            });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  // console.log(data);

  if (loginSuccess) {
    return null;
  }

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="LoginImg">
          <img src={logo} alt="login image" />
        </div>
        <h2>Employee</h2>
        <div className="email inpt-grp">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <span className="top">Email</span>
        </div>
        <div className="password inpt-grp">
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <span className="top">Password</span>
        </div>
        <div className="btns">
          {/* <Handleform /> */}
          <button type="submit" className="login-btn">
            Log In
          </button>
          <button
            href="#"
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Admin ?
          </button>
        </div>
      </form>
      {/* {error && <p className="errorMsg" >Error: {error.message}</p>} */}
      {error && (
        <span className="errorMsg">
          {error.message}
          <span className="close" onClick={handleCloseError}>
            &times;
          </span>
        </span>
      )}
      {userData && <span>{userData.name}</span>}
    </div>
  );
};

export default Login;
