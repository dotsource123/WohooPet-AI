import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/travel-spots", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    // Step 1: Get coordinates
    const locationRes = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        city,
        format: "json",
      },
    });

    if (!locationRes.data.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lon } = locationRes.data[0];

    // Step 2: Get pet-friendly places (using kinds=natural)
    const apiRes = await axios.get("https://api.opentripmap.com/0.1/en/places/radius", {
      params: {
        radius: 5000,
        lon,
        lat,
        kinds: "natural",
        apikey: process.env.OPENTRIPMAP_API_KEY,
      },
    });

    // Filter out places with name 'Unnamed' or empty
    const filteredFeatures = (apiRes.data.features || []).filter(place => {
      const name = place.properties.name;
      return name && name.trim() !== "" && name.toLowerCase() !== "unnamed park";
    });

    res.json({ ...apiRes.data, features: filteredFeatures });
  } catch (err) {
    console.error("Error details:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
