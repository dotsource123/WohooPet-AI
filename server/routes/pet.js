import express from "express";
import Pet from "../models/Pet.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

//  Protected Route: Add pet
router.post("/", verifyToken, async (req, res) => {
  try {
    const petData = {
      ...req.body,
      userId: req.user.id,
    };
    const pet = new Pet(petData);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    console.error("Error saving pet:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//  Protected Route: Get all pets of logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user.id });
    res.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Protected Route: Get pet by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, userId: req.user.id });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//  Protected Route: Update pet
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPet = await Pet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedPet) return res.status(404).json({ message: "Pet not found or unauthorized" });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//  Protected Route: Delete pet
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPet = await Pet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deletedPet) return res.status(404).json({ message: "Pet not found or unauthorized" });
    res.json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
