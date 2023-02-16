import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./ProtectedRoute";
import AddPic from "./views/AddPic/AddPic";
import Homepage from "./views/Homepage/Homepage";
import ForgotPassword from "./views/Landing/ForgotPassword";
import Home from "./views/Landing/Home";
import SignIn from "./views/Landing/SignIn";
import SignUp from "./views/Landing/SignUp";
import Pic from "./views/Pic";
import SearchPage from "./views/Search/SearchPage";
import UserProfile from "./views/User profile/UserProfile";
import UserSettings from "./views/UserSettings/UserSettings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up/" element={<SignUp />} />
        <Route path="/sign-in/" element={<SignIn />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route
          path="/homepage/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile/"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-settings/"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />
        <Route path="/pic/" element={<Pic />} />
        <Route path="/add-pic/" element={<AddPic />} />
        <Route
          path="/searchpage/"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
