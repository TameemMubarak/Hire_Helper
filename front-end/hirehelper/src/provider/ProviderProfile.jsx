import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./providerProfile.css";

function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  async function bookNow() {
    try {
      await axios.post(
        "http://localhost:8080/booking",
        {
          providerId: id,
          bookingDate: "2026-06-20",
          bookingTime: "10:00 AM"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking Created Successfully");
      navigate("/bookings");
    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  }

  return (
    <div className="provider-page" style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", paddingTop: "80px", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 15px" }}>
        <div className="provider-card" style={{ background: "white", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "30px", textAlign: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=500"
            alt="provider"
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px", border: "3px solid #60A5FA" }}
          />

          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", margin: "0 0 10px 0" }}>
            Service Provider #{id}
          </h1>

          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: "1.5", margin: "0 0 25px 0" }}>
            Experienced professional available for quick, high-quality local services. Clean background check and high ratings.
          </p>

          <button
            onClick={bookNow}
            style={{
              background: "linear-gradient(135deg, #2563EB, #3B82F6)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProviderProfile;