import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddPic from "./views/AddPic/AddPic";
import Homepage, { AppContext } from "./views/Homepage/Homepage";
import ForgotPassword from "./views/Landing/ForgotPassword";
import Home from "./views/Landing/Home";
import SignIn from "./views/Landing/SignIn";
import SignUp from "./views/Landing/SignUp";
import Pic from "./views/Pic";
import UserProfile from "./views/User profile/UserProfile";
import UserSettings from "./views/UserSettings/UserSettings";

function App() {
  const userdata = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={userdata}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up/" element={<SignUp />} />
            <Route path="/sign-in/" element={<SignIn />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route path="/homepage/" element={<Homepage />} />
            <Route path="/user-profile/" element={<UserProfile />} />
            <Route path="/user-settings/" element={<UserSettings />} />
            <Route path="/pic/" element={<Pic />} />
            <Route path="/add-pic/" element={<AddPic />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
