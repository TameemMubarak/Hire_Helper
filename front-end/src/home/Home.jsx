import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Get Help in Minutes from Trusted Local Helpers</h1>
            <p>
              HireHelper connects you with verified local individuals for home cleaning, moving, gardening, assemblies, and more. Simple, reliable, and secure.
            </p>
            <div className="hero-cta">
              <button
                className="btn-primary-hero"
                onClick={() => navigate(isLoggedIn ? "/dashboard" : "/register")}
              >
                Post a Task Now
              </button>
              <button
                className="btn-secondary-hero"
                onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
              >
                Become a Helper
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
              alt="Helper working"
              className="hero-img-element"
            />
          </div>
        </div>

        {/* STATISTICS */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Completed Tasks</p>
          </div>
          <div className="stat-card">
            <h3>5,000+</h3>
            <p>Verified Helpers</p>
          </div>
          <div className="stat-card">
            <h3>4.9★</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </header>

      {/* TRUST / TESTIMONIALS SECTION */}
      <section className="trust-section" id="about">
        <div className="section-title">
          <h2>Loved by Homeowners and Helpers</h2>
          <p>Read what our community members are saying</p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "Needed a helper to unload a heavy couch. Found someone within 10 minutes on HireHelper. Highly recommended!"
            </p>
            <div className="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=47" alt="User avatar" />
              <div>
                <h4>Sarah M.</h4>
                <p>Task Creator</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "As a helper, HireHelper has given me the flexibility to choose jobs that fit my schedule and earn extra income."
            </p>
            <div className="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=12" alt="User avatar" />
              <div>
                <h4>David K.</h4>
                <p>Helper / Tasker</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">
              "Simple registration and transparent booking status. The platform takes care of scheduling and notifications perfectly."
            </p>
            <div className="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=59" alt="User avatar" />
              <div>
                <h4>Emily L.</h4>
                <p>Task Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATING SECTIONS LAYOUT */}
      <section className="alternating-sections">
        {/* Section 1: Image Left, Text Right */}
        <div className="alternating-row">
          <div className="row-image">
            <img src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500" alt="Trust and safety" />
          </div>
          <div className="row-content">
            <h3>Safety and Quality Guaranteed</h3>
            <p>
              Every helper undergoes identity verification and credential checkups before starting work. We prioritize safety and quality above all else.
            </p>
            <ul className="features-list">
              <li>🛡️ ID & Background Checks</li>
              <li>💬 Transparent Reviews</li>
              <li>💳 Secure Online Invoicing</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Text Left, Image Right */}
        <div className="alternating-row reverse" id="settings">
          <div className="row-content">
            <h3>Earn Extra Income on Your Terms</h3>
            <p>
              Become a helper on HireHelper. Set your own rates, choose your preferred tasks, and work whenever you are free. No fixed commitments.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate(isLoggedIn ? "/dashboard" : "/register")}
            >
              Apply to Help
            </button>
          </div>
          <div className="row-image">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500" alt="Earn money" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" id="contact">
        <div className="footer-container">
          <div className="footer-column brand-col">
            <h3>🛠️ HireHelper</h3>
            <p>Connecting people who need help with verified local helpers.</p>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <a href="#">House Cleaning</a>
            <a href="#">Moving Help</a>
            <a href="#">Yard Work</a>
            <a href="#">Handyman</a>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Safety Center</a>
            <a href="#">Terms & Privacy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 HireHelper Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
