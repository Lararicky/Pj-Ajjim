const express = require("express");
const router = express.Router();
const Vote = require("../db/votes");

// Create a new vote
router.post("/", async (req, res) => {
    try {
        const vote = new Vote({
            user_id: req.body.user_id,
            contribution_id: req.body.contribution_id,
            vote_type: req.body.vote_type,
        });

        const savedVote = await vote.save();
        res.status(201).json(savedVote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all votes for a contribution
router.get("/contribution/:id", async (req, res) => {
    try {
        const votes = await Vote.find({ contribution_id: req.params.id });
        res.json(votes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;