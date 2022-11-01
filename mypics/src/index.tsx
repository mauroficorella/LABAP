import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/Landing/Home";
import SignIn from "./views/Landing/SignIn";
import SignUp from "./views/Landing/SignUp";
import ForgotPassword from "./views/Landing/ForgotPassword";
import Homepage from "./views/Homepage";
import UserProfile from "./views/UserProfile";
import Pic from "./views/Pic";
import AddPic from "./views/AddPic";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up/" element={<SignUp />} />
      <Route path="/sign-in/" element={<SignIn />} />
      <Route path="/forgot-password/" element={<ForgotPassword />} />
      <Route path="/homepage/" element={<Homepage />} />
      <Route path="/user-profile/" element={<UserProfile />} />
      <Route path="/pic/" element={<Pic />} />
      <Route path="/add-pic/" element={<AddPic />} />
    </Routes>
  </BrowserRouter>
);
