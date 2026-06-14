import {
  BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProviderProfile from "./provider/ProviderProfile";
import Bookings from "./bookings/Bookings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
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