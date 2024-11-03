const express = require("express");
const router = express.Router();
const Like = require("../db/likes");

// Add a like to a story
router.post("/", async (req, res) => {
    try {
        const like = new Like({
            user_id: req.body.user_id,
            story_id: req.body.story_id,
        });

        const savedLike = await like.save();
        res.status(201).json(savedLike);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all likes for a story
router.get("/story/:id", async (req, res) => {
    try {
        const likes = await Like.find({ story_id: req.params.id });
        res.json(likes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;