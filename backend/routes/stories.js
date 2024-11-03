const express = require("express");
const router = express.Router();
const Story = require("../db/stories");

// Get all stories
router.get("/", async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new story
router.post("/", async (req, res) => {
    const story = new Story({
        title: req.body.title,
        created_by: req.body.created_by,
        status: req.body.status
    });

    try {
        const newStory = await story.save();
        res.status(201).json(newStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;