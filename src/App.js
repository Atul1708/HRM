import Home from "./Pages/Home/Home";
// import Login from "./Pages/login/Login"
import List from "./Pages/list/List";
import Single from "./Pages/single/Single";
import New from "./Pages/new/New";
import Login from "./Components/login/Login";
import Admin from "./Components/admin/Admin";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { userInputs } from "./formSource";
import { useState } from "react";
import { useAuth } from "./Components/Authprovider";
import CalendarComp from "./Components/Calendar/CalendarComp";
import Detail from "./Components/employeeDetails/Detail";

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
    {/* Use conditional rendering based on isLoggedIn */}
    {isLoggedIn ? (
      // If logged in, render the main application
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="events" element={<CalendarComp />}></Route>
            <Route path="attendance" element={<Detail />}></Route>
          
          <Route path="employees">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add new employee" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    ) : (
      // If not logged in, render the login component
      <Admin />
    )}

    </div>
  );
}

export default App;
