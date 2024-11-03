const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["draft", "active", "inactive", "completed"], // Example status values
        default: "active"
    }
});

module.exports = mongoose.model("Story", storySchema);