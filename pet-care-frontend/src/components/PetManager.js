import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api/pet";

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    medicalHistory: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_BASE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Fetch error:", text);
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      alert("Failed to fetch pets: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, breed, age, medicalHistory } = form;

    if (!name || !breed || !age || !medicalHistory) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, breed, age, medicalHistory }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save pet");
      }

      alert(editingId ? "Pet updated!" : "Pet added!");
      setForm({ name: "", breed: "", age: "", medicalHistory: "" });
      setEditingId(null);
      fetchPets();
    } catch (error) {
      console.error("Error saving pet:", error);
      alert("Failed to save pet: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Pet deleted!");
      fetchPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("Failed to delete pet: " + error.message);
    }
  };

  const handleEdit = (pet) => {
    setForm({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      medicalHistory: pet.medicalHistory,
    });
    setEditingId(pet._id);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 20px", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: 30 }}>Manage Your Pets</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 15, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
        <input style={inputStyle} name="name" placeholder="Pet Name" value={form.name} onChange={handleChange} />
        <input style={inputStyle} name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} />
        <input style={inputStyle} name="age" type="number" placeholder="Age" min="0" value={form.age} onChange={handleChange} />
        <textarea style={{ ...inputStyle, minHeight: 80 }} name="medicalHistory" placeholder="Medical History" value={form.medicalHistory} onChange={handleChange} />
        <button type="submit" style={{ ...buttonStyle, backgroundColor: editingId ? "#27ae60" : "#3498db" }}>
          {editingId ? "Update Pet" : "Add Pet"}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setForm({ name: "", breed: "", age: "", medicalHistory: "" }); setEditingId(null); }} style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}>
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading pets...</p>
      ) : pets.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No pets found.</p>
      ) : (
        pets.map((pet) => (
          <div key={pet._id} style={petCardStyle}>
            <div style={{ color: "#34495e" }}>
              <strong>{pet.name}</strong>
              <div>Breed: {pet.breed}</div>
              <div>Age: {pet.age}</div>
              <div>Medical History: {pet.medicalHistory}</div>
            </div>
            <div>
              <button onClick={() => handleEdit(pet)} style={{ ...actionBtnStyle, backgroundColor: "#2980b9" }}>Edit</button>
              <button onClick={() => handleDelete(pet._id)} style={{ ...actionBtnStyle, backgroundColor: "#c0392b" }}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "10px 15px",
  fontSize: 16,
  borderRadius: 6,
  border: "1.5px solid #ccc",
  minWidth: 150,
  flexGrow: 1,
};

const buttonStyle = {
  padding: "10px 25px",
  fontSize: 16,
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  color: "white",
  alignSelf: "center",
};

const actionBtnStyle = {
  marginLeft: 10,
  padding: "6px 12px",
  fontSize: 14,
  borderRadius: 5,
  border: "none",
  cursor: "pointer",
  color: "white",
};

const petCardStyle = {
  border: "1px solid #ddd",
  borderRadius: 10,
  padding: 20,
  marginBottom: 15,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
};

export default ManagePets;
