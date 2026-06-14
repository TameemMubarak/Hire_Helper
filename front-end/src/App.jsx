import {
  BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import OtpVerify from "./login/OtpVerify";
import Dashboard from "./dashboard/Dashboard";
import ProviderProfile from "./provider/ProviderProfile";
import Bookings from "./bookings/Bookings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-otp"
          element={<OtpVerify />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/provider/:id"
          element={<ProviderProfile />}
        />

        <Route 
          path="/bookings"
          element={<Bookings />}
        /> 

      </Routes>

    </BrowserRouter>

  );
}

export default App;