import React, { useState, useEffect } from "react";

const AIHealthAssistant = () => {
  const [notes, setNotes] = useState("");
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          alert("Please log in first to fetch your pets.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/pet", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        });

        const data = await res.json();
        console.log("Fetched pets:", data);

        if (!res.ok) {
          alert(data.message || "Failed to fetch pets");
          return;
        }

        const petsArray = Array.isArray(data) ? data : data.pets || [];
        setPets(petsArray);

        if (petsArray.length > 0) {
          setPetId(petsArray[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch pets", err);
        alert("Error fetching pets");
      }
    };

    fetchPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!notes.trim() || !petId) {
      alert("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("token"); // Get token here too
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const formData = new FormData();
    formData.append("notes", notes);
    formData.append("petId", petId);

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/api/ai-health", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add token here
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
      } else {
        setResult(data.error || "Analysis failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>AI Health Check for Your Pet 🐾</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Select Your Pet:</label>
        <select
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          style={styles.select}
          disabled={pets.length === 0}
        >
          {Array.isArray(pets) && pets.length > 0 ? (
            pets.map((pet) => (
              <option key={pet._id} value={pet._id}>
                {pet.name || "Unnamed Pet"}
              </option>
            ))
          ) : (
            <option value="">No pets available</option>
          )}
        </select>

        <label style={styles.label}>Describe symptoms or concerns:</label>
        <textarea
          placeholder="e.g., Vomiting, low energy, dry nose..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          style={styles.textarea}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Analyzing..." : "Analyze Health"}
        </button>
      </form>

      {result && (
        <div style={styles.resultBox}>
          <h4>AI Diagnosis:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    fontFamily: "Segoe UI, sans-serif",
    padding: 20,
  },
  heading: {
    textAlign: "center",
    marginBottom: 25,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  label: {
    fontWeight: "bold",
  },
  select: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  textarea: {
    padding: 12,
    fontSize: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    padding: "12px 20px",
    fontSize: 16,
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: "#f4f4f4",
    padding: 20,
    borderRadius: 10,
  },
};

export default AIHealthAssistant;
