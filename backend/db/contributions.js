const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
    story_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story", // Reference to the Story model
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Contribution", contributionSchema);