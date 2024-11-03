const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Import routes
const tagRoutes = require("./routes/tags");
const userRoutes = require("./routes/users");
const voteRoutes = require("./routes/votes");
const storyTagRoutes = require("./routes/story_tags");
const storyRoutes = require("./routes/stories");
const likeRoutes = require("./routes/likes");
const contributionRoutes = require("./routes/contributions");
const commentRoutes = require("./routes/comments");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Server running");
});
app.use("/tag", tagRoutes);
app.use("/user", userRoutes);
app.use("/vote", voteRoutes);
app.use("/story", storyRoutes);
app.use("/story-tag", storyTagRoutes);
app.use("/like", likeRoutes);
app.use("/contribution", contributionRoutes);
app.use("/comment", commentRoutes); 

// Connect to MongoDB
async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "tribetalesdb",
    });
    console.log("mongodb connected")
}

connectDb().catch((err) => {
    console.error(err);
})

// Start Server
app.listen(port, (err) => {
    if (err) console.error("Server error:", err);
    else console.log("Server running on port", port);
});