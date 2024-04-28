import React, { useState } from "react";
import logo from "../../assets/login.png"
import "./Admin.scss";
import axios from "axios";
import Endpoint from "../../api";
import { useAuth } from "../Authprovider";
// import { useHistory } from "react-router-dom"
const Admin = () => {
  // const history = useHistory();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [curentLocation, setcurentLocation] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [locationData, setLocationData] = useState("");
  const [successMessgae, setSuccessMessgae] = useState(false)
  const [successLogin, setSuccessLogin] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    // console.log(email);
    adminApi(email, pass)
    handleCloseError();
    if (email === "" || pass === "") {
      setError({message: "Please fill all the fields"});
      return;
    }
  }

  const handleCloseError = () => {
    setError(null);
  };


  const adminApi = (email, pass) => {
    const url = `${Endpoint}/api/admin/`;
    const payload = {
      email: email,
      password: pass,
    };
    axios
      .post(url, payload)
      .then((res) => {
        const data = res.data;
        console.log(data);
        let email = data.mail;
        console.log(email);
        if (data.message === 'Welcome Admin') {
          console.log('Logged in!');
          login();
          setCurrentUser(email);
          setSuccessLogin(true)
          console.log(successLogin);
          // history.push("/")
          setEmail("");
          setPass("");
        } else if (data.error === 'Invalid') {
          setError({ message: "Please enter valid credentials" });
          setEmail("");
          setPass("");
        } 
        else {
          console.error("Received an unexpected response from the server.");
        }
      })
      .catch((err) => {
        console.log(err.message);
        if(err.message === 'Network Error') {
          setError({ message: "Unable to connect with server" });
          setEmail("");
          setPass("");
        } 
        // else console.error(err);
      });
  };

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmitEvent}>
        <div className="LoginImg">
          <img src={logo} alt="login image" />
        </div>
        <h2>Admin</h2>
        <div className="email inpt-grp">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" id="email" name="email" />
          <span className="top">Email</span>
        </div>
        <div className="password inpt-grp">
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
          <span className="top">Password</span>
        </div>
        <div className="btns">
          <button type="submit" className="login-btn">Log In</button>
        </div>
      </form>
      {error && <span className="errorMsg">{error.message}
        <span className="close" onClick={handleCloseError}>&times;</span>
      </span>}
    </div>
  )
}

export default Admin;