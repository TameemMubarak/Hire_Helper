import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("https://i.pravatar.cc/150?img=1");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  async function registerBtn() {
    if (!username || !email || !password || !firstName || !lastName || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        {
          username,
          email,
          password,
          role,
          firstName,
          lastName,
          phoneNumber,
          profilePicture
        }
      );

      if (response.data.status === "OTP_SENT") {
        alert("Registration initiated. OTP sent to email.");
        navigate("/verify-otp", { state: { email } });
      } else {
        alert("Registration completed.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <div className="body">
      <div className="container" style={{ maxWidth: "1000px", minHeight: "650px" }}>
        <div className="left-panel">
          <img
            src="/hirehelper_loginLogo.png"
            alt="HireHelper Logo"
            className="logo"
            onError={(e) => {
              // fallback if logo fails
              e.target.src = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200";
            }}
          />
          <h1>HireHelper</h1>
          <p>
            Join the community of trusted task creators and skilled helpers. Earn money, get jobs done.
          </p>
        </div>

        <div className="right-panel" style={{ padding: "30px 40px" }}>
          <div className="login-card" style={{ maxWidth: "450px" }}>
            <h2>Create Account</h2>
            <p className="subtitle">Register to find help or earn money</p>

            <div className="register-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 15px", textAlign: "left" }}>
              <div style={{ gridColumn: "span 1" }}>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div style={{ gridColumn: "span 1" }}>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="johndoe123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Choose password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>Profile Image URL</label>
                <input
                  type="text"
                  placeholder="https://i.pravatar.cc/150?img=1"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  style={{ marginBottom: "15px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <button
                  type="submit"
                  onClick={registerBtn}
                  style={{ marginTop: "10px" }}
                >
                  Register
                </button>
              </div>
            </div>

            <p className="register" style={{ marginTop: "15px" }}>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
