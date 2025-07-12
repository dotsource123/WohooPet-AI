// routes/article.js
import express from "express";
import { Article } from "../models/Article.js";

const router = express.Router();

// @route   POST /api/articles
// @desc    Create a new article
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newArticle = new Article({ title, content, author });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ error: "Failed to create article" });
  }
});

// @route   GET /api/articles
// @desc    Get all articles
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { author: email } : {};

    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// @route   GET /api/articles/:id
// @desc    Get a single article by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// @route   PUT /api/articles/:id
// @desc    Update an article
router.put("/:id", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ error: "Failed to update article" });
  }
});

// @route   DELETE /api/articles/:id
// @desc    Delete an article
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

export default router;

