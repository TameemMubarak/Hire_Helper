import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.css";

function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  async function verifyBtn() {
    if (!email || !otp) {
      alert("Please enter both email and OTP");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      if (response.data.status === "VERIFIED") {
        localStorage.setItem("token", response.data.token);
        alert("Verification Successful");
        navigate("/dashboard");
      } else {
        alert("Verification Failed");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Verification Failed");
    }
  }

  return (
    <div className="body">
      <div className="container" style={{ maxWidth: "800px", minHeight: "500px" }}>
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
            Secure verification helps protect our community of task creators and helpers.
          </p>
        </div>

        <div className="right-panel">
          <div className="login-card">
            <h2>Enter Security Code</h2>
            <p className="subtitle">We've sent a 6-digit OTP code. Please check your console/email logs.</p>

            <div style={{ textAlign: "left" }}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Verification Code (OTP)</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                style={{ textAlign: "center", fontSize: "1.2rem", letterSpacing: "8px" }}
              />

              <button
                type="submit"
                onClick={verifyBtn}
              >
                Verify & Continue
              </button>
            </div>

            <p className="register" style={{ marginTop: "20px" }}>
              Need help? <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Back to Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
