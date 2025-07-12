import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import backgroundImage from "../assets/images/drawing-1.jpg";
import futuraFont from "../assets/fonts/Futura-Bold.ttf";
import CartoonsSection from "./Watch"; // ⬅️ Import Watch section component
import ReadingSection from "./Read";
import TravelSection from "./Travel";

function LandingPage() {
  // Load custom font
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: 'futura';
        src: url(${futuraFont}) format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "rgb(56, 55, 55)",
          padding: "20px 50px",
          textAlign: "right",
          height: "80px",
          fontSize: "3vh",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li style={{ display: "inline", marginLeft: "10px" }}>
            <a href="#watch" >
              Watch
            </a>
          </li>
           <li style={{ display: "inline", marginLeft: "10px" }}>
            <a href="#travel" >
              Travel
            </a>
          </li>
          <li style={{ display: "inline", marginLeft: "10px" }}>
            <a href="#read">
              Read
            </a>
          </li>
          <li style={{ display: "inline", marginLeft: "10px" }}>
            <Link to="/login" >
              Login
            </Link>
          </li>
          <li style={{ display: "inline", marginLeft: "10px" }}>
            <Link to="/register" >
              Register
            </Link>
          </li>
          <li style={{ display: "inline", marginLeft: "20px" }}>
            <Link to="/about" >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div id="main">
        <div
          id="page1"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            padding: "100px 0",
            textAlign: "center",
            color: "#fff",
            fontFamily: "'futura', sans-serif",
          }}
        >
          <h1>
            Bcoz your buddy <br /> deserves the BEST!
          </h1>
        </div>
      </div>

      {/* Watch Section (Cartoons) */}
      <div id="watch">
        <CartoonsSection />
      </div>

      <div id="travel">
        <TravelSection />
      </div>
      
      {/* Read Section */}
      <div id="read">
        <ReadingSection />
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#383737",
          color: "#fff",
          textAlign: "center",
          padding: "20px 10px",
          fontFamily: "'futura', sans-serif",
          marginTop: "40px",
        }}
      >
        <p>© {new Date().getFullYear()} VooHoo Pet AI. All rights reserved.</p>
        <p>
          <a href="/about" style={{ color: "#fff", textDecoration: "underline", marginRight: "15px" }}>
            About Us
          </a>
          <a href="/contact" style={{ color: "#fff", textDecoration: "underline" }}>
            Contact
          </a>
        </p>
      </footer>
    </>
  );
}

export default LandingPage;
