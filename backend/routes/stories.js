const express = require("express");
const router = express.Router();
const Story = require("../db/stories");
const Tag = require("../db/tags");
const User = require("../db/users");

// Get all stories
router.get("/stories", async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new story
router.post("/newstory", async (req, res) => {
    try {
        const { title, genre, status, content, created_by } = req.body;
        let coverImage = null;

        // Validate that required fields are provided
        if (!title || !content || !created_by) {
            return res.status(400).json({ message: "Title, content, and creator are required." });
        }

        // ตรวจสอบว่ามีไฟล์อัพโหลดหรือไม่
        if (req.files && req.files.coverImage) {
            const image = req.files.coverImage;
            coverImage = image.data.toString('base64'); // แปลงข้อมูลไฟล์เป็น Base64 string
        }

        const story = new Story({
            title,
            genre,
            status,
            content,
            created_by,
            coverImage
        });

        // Save the new story
        const newStory = await story.save();
        res.status(201).json(newStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;