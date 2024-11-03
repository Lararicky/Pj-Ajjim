const express = require("express");
const router = express.Router();
const Contribution = require("../db/contributions");

// Create a new contribution
router.post("/", async (req, res) => {
    try {
        const contribution = new Contribution({
            story_id: req.body.story_id,
            user_id: req.body.user_id,
            content: req.body.content,
        });

        const savedContribution = await contribution.save();
        res.status(201).json(savedContribution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all contributions for a story
router.get("/story/:id", async (req, res) => {
    try {
        const contributions = await Contribution.find({ story_id: req.params.id });
        res.json(contributions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;