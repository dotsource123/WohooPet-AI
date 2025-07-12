import React, { useEffect, useState } from "react";

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchArticles = async () => {
    setFetching(true);
    try {
      const email = localStorage.getItem("email");
      const res = await fetch(`http://localhost:5000/api/articles?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingArticle(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const method = editingArticle ? "PUT" : "POST";
      const url = editingArticle
        ? `http://localhost:5000/api/articles/${editingArticle._id}`
        : "http://localhost:5000/api/articles";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          author: localStorage.getItem("email") || "Anonymous",
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      await fetchArticles();
      alert(editingArticle ? "Article updated!" : "Article published!");
      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Article deleted!");
      fetchArticles();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete the article.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", fontFamily: "Segoe UI", padding: "0 20px" }}>
      <h2>{editingArticle ? "Edit Article" : "Write a New Article"}</h2>
      {error && <div style={{ color: "#e74c3c", marginBottom: 15 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={{
            width: "100%",
            padding: "12px 15px",
            fontSize: 18,
            marginBottom: 15,
            borderRadius: 6,
            border: "1.5px solid #ccc",
            boxSizing: "border-box",
          }}
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          style={{
            width: "100%",
            padding: "12px 15px",
            fontSize: 16,
            marginBottom: 15,
            borderRadius: 6,
            border: "1.5px solid #ccc",
            boxSizing: "border-box",
            minHeight: 200,
            resize: "vertical",
            fontFamily: "inherit",
          }}
          placeholder="Write your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            padding: "12px 30px",
            backgroundColor: "#3498db",
            border: "none",
            borderRadius: 6,
            color: "white",
            fontSize: 18,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#217dbb")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
          disabled={loading}
        >
          {loading ? (editingArticle ? "Updating..." : "Publishing...") : editingArticle ? "Update Article" : "Publish Article"}
        </button>
        {editingArticle && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              marginLeft: 10,
              padding: "12px 20px",
              backgroundColor: "#e74c3c",
              border: "none",
              borderRadius: 6,
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr style={{ margin: "40px 0" }} />
      <h2>My Articles</h2>
      {fetching ? (
        <p>Loading articles...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {articles.map((article) => (
            <li
              key={article._id}
              style={{
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ margin: "0 0 5px" }}>{article.title}</h3>
              <p style={{ margin: "0 0 10px", color: "#555" }}>
                {article.content.substring(0, 100)}...
              </p>
              <small style={{ color: "#888" }}>Author: {article.author}</small>
              <br />
              <button
                onClick={() => {
                  setTitle(article.title);
                  setContent(article.content);
                  setEditingArticle(article);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  backgroundColor: "#2980b9",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article._id)}
                style={{
                  marginTop: 10,
                  backgroundColor: "#c0392b",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleManager;
