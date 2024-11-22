const express = require("express");
const router = express.Router();
const Story = require("../db/stories");
const fileUpload = require("express-fileupload");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Shush12345';
//const mongoose = require('mongoose');

// Middleware สำหรับตรวจสอบ JWT Token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
        req.user = { _id: decoded.userId }; // ตั้งค่าผู้ใช้ที่ผ่านการตรวจสอบ Token
        next();
    });
};

// Get all stories
router.get("/stories", async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Use fileUpload middleware
router.use(fileUpload());

// Apply verifyToken middleware to route for creating a new story
router.post("/newstory", verifyToken, async (req, res) => {
    try {
        const { title, genre, status, content } = req.body;
        console.log(title, genre, status, content)
        const created_by = req.user._id;

        // Validate that required fields are provided
        if (!title || !content || !created_by) {
            return res.status(400).json({ message: "Title, content, and creator are required." });
        }

        // ตรวจสอบว่ามีไฟล์อัพโหลดหรือไม่
        let coverImage = null;
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