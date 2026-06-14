import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    async function loadBookings() {
      try {
        const response = await axios.get(
          "http://localhost:8080/booking/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadBookings();
  }, [token, navigate]);

  return (
    <div className="bookings-page" style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", paddingTop: "80px", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="bookings-container" style={{ maxWidth: "800px", margin: "40px auto", padding: "24px", background: "white", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", margin: "0 0 8px 0" }}>My Bookings</h2>
        <p style={{ color: "#64748B", fontSize: "0.9rem", margin: "0 0 24px 0" }}>View history of bookings made with service providers.</p>

        {bookings.length === 0 ? (
          <p className="no-data" style={{ textAlign: "center", color: "#94A3B8", fontStyle: "italic", padding: "40px 0" }}>
            No bookings found.
          </p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="booking-card"
              style={{
                background: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "0.95rem", color: "#334155" }}>
                    <strong>Date:</strong> {booking.bookingDate}
                  </p>
                  <p style={{ margin: "0", fontSize: "0.95rem", color: "#334155" }}>
                    <strong>Time:</strong> {booking.bookingTime}
                  </p>
                </div>
                <div>
                  <span className={`status-badge ${booking.status?.toLowerCase() || "pending"}`} style={{
                    padding: "6px 12px",
                    borderRadius: "30px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    background: booking.status === "PENDING" ? "#FEF3C7" : "#DCFCE7",
                    color: booking.status === "PENDING" ? "#D97706" : "#15803D"
                  }}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;