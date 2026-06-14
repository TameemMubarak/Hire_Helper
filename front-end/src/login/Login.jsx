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

      if (response.data.status === "OTP_SENT") {
        alert("Credentials verified. OTP code has been logged to console.");
        navigate("/verify-otp", { state: { email } });
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        alert("Login Successful");
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed");
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
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200";
            }}
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
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/register"); }}> Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;