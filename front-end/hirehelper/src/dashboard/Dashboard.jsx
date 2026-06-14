import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";

function Dashboard() {

  const [providers, setProviders] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    loadProviders();
  }, []);

  async function loadProviders() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:8080/provider",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setProviders(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  function logout() {

    localStorage.removeItem("token");

    window.location.href = "/";
  }

  return (

    <div className="dashboard">

      {/* HEADER */}

      <header className="header">

        <div className="logo-section">

          <h1>
            HireHelper
          </h1>

        </div>

        <div className="profile-section">

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="profile-pic"
            onClick={() =>
              setShowMenu(!showMenu)
            }
          />

          {
            showMenu && (

              <div className="profile-menu">

                <button
                  onClick={logout}
                >
                  Logout
                </button>

              </div>
            )
          }

        </div>

      </header>

      {/* HERO */}

      <section className="hero">

        <h2>
          Find Trusted Professionals
        </h2>

        <p>
          Connect with skilled workers
          near your location.
        </p>

      </section>

      {/* PROVIDERS */}

      <div className="provider-grid">

        {
          providers.map(provider => (

            <div
              key={provider.id}
              className="provider-card"
            >

              <img
                src={
                  provider.imageUrl ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=500"
                }
                alt={provider.name}
                className="provider-image"
              />

              <div className="provider-content">

                <h3>
                  {provider.name}
                </h3>

                <span className="skill-badge">
                  {provider.skill}
                </span>

                <p>
                  📍 {provider.location}
                </p>

                <p>
                  ⭐ {provider.rating}
                </p>

                <p>
                  {provider.experience}
                  {" "}Years Experience
                </p>

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/provider/${provider.id}`
                    )
                  }
                >
                  View Profile
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Dashboard;