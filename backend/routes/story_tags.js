const express = require("express");
const router = express.Router();
const Story = require("../db/stories");
const Tag = require("../db/tags");

// Add a tag to a story
router.post("/:storyId/tags", async (req, res) => {
    const storyId = req.params.storyId;
    const tagId = req.body.tagId;

    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        // Add the tag to the story if not already added
        if (!story.tags.includes(tagId)) {
            story.tags.push(tagId);
            await story.save();
        }
        res.status(201).json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all tags for a story
router.get("/:storyId/tags", async (req, res) => {
    const storyId = req.params.storyId;

    try {
        const story = await Story.findById(storyId).populate("tags");
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.json(story.tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove a tag from a story
router.delete("/:storyId/tags/:tagId", async (req, res) => {
    const { storyId, tagId } = req.params;

    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        // Remove the tag from the story's tags array
        story.tags = story.tags.filter(tag => tag.toString() !== tagId);
        await story.save();

        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
