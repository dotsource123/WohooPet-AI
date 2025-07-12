import express from "express";
import fetch from "node-fetch";
import Pet from "../models/Pet.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { notes, petId } = req.body;

    if (!notes || !petId) {
      return res.status(400).json({ error: "Notes and petId are required." });
    }

    // Find pet owned by the user
    const pet = await Pet.findOne({ _id: petId, userId: req.user.id });
    if (!pet) {
      return res.status(404).json({ error: "Pet not found or unauthorized." });
    }

    const prompt = `
Give a diagnosis for the following pet based on the notes.

Pet:
- Name: ${pet.name}
- Age: ${pet.age}
- Breed: ${pet.breed}
- Species: ${pet.species || "Unknown"}

Symptoms:
${notes}
`;

    // Call Hugging Face API
    const hfResponse = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 100 },
      }),
    });

    const contentType = hfResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await hfResponse.text();
      console.error("Unexpected Hugging Face response:", errorText);
      return res.status(502).json({ error: "Unexpected Hugging Face response." });
    }

    const data = await hfResponse.json();
    const result = data[0]?.generated_text || "No AI result.";

    return res.json({ result });
  } catch (err) {
    console.error("AI error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
