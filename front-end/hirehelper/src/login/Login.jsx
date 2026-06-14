import { useState } from "react";
import { useNavigate }
from "react-router-dom";

import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginBtn() {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data
      );
      navigate("/Dashboard");
      alert("Login Successful");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  }

  return (
    <div className="body">
      <div className="container">
        <div className="left-panel">
          <img
            src="/hirehelper_loginLogo.png"
            alt="HireHelper Logo"
            className="logo"
          />

          <h1>HireHelper</h1>

          <p>
            Connecting people who need help with skilled
            professionals who can get the job done.
          </p>
        </div>

        <div className="right-panel">
          <div className="login-card">
            <h2>Welcome Back</h2>

            <p className="subtitle">
              Sign in to continue
            </p>

            <div>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="submit"
                onClick={loginBtn}
              >
                Login
              </button>
            </div>

            <p className="register">
              Don't have an account?
              <a href="#"> Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;