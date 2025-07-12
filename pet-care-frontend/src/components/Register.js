import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerBG from "../assets/images/loginBG.avif"; // Reuse dog image

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created! Redirecting to login 🐾");
        setTimeout(() => navigate("/login"), 1500); // ⏳ Redirect after success
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${registerBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#FF6F61", marginBottom: "25px" }}>
          🐾 Register for AI Pet Care
        </h2>

        {error && (
          <p
            style={{
              color: "#ff4d4f",
              backgroundColor: "#ffe6e6",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            style={{
              color: "#4CAF50",
              backgroundColor: "#e8f5e9",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {success}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1.5px solid #FF6F61",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1.5px solid #FF6F61",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#FF6F61",
            border: "none",
            borderRadius: "15px",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate("/")} // ✅ go to login
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "14px",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "15px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back 
        </button>
      </form>
    </div>
  );
};

export default Register;
