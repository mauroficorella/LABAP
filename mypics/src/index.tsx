import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/Landing/Home";
import SignIn from "./views/Landing/SignIn";
import SignUp from "./views/Landing/SignUp";
import ForgotPassword from "./views/Landing/ForgotPassword";

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
    </Routes>
  </BrowserRouter>
);
