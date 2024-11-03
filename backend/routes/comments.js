const express = require("express");
const router = express.Router();
const Comment = require("../db/comments");

// Create a new comment
router.post("/", async (req, res) => {
    try {
        const comment = new Comment({
            contribution_id: req.body.contribution_id,
            user_id: req.body.user_id,
            comment: req.body.comment,
        });

        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all comments for a contribution
router.get("/contribution/:id", async (req, res) => {
    try {
        const comments = await Comment.find({ contribution_id: req.params.id });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;