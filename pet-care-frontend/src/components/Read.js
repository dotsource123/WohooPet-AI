import React, { useEffect, useState } from "react";

const Read = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/articles"); // adjust if needed
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "peachpuff",  // peach background
        fontFamily: "'Cedarville Cursive', cursive", // cursive font
        minHeight: "100vh", // optional: full viewport height
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Community Articles</h2>

      {articles.length === 0 ? (
        <p>No articles available yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {articles.map((article) => (
            <div
              key={article._id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                fontFamily: "'Cedarville Cursive', cursive", // apply cursive also here
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "#222" }}>{article.title}</h3>
              <p style={{ marginBottom: "5px", fontSize: "14px", color: "#555" }}>
                Author: {article.author || "Anonymous"}
              </p>
              <p style={{ fontSize: "15px", color: "#444" }}>{article.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;
