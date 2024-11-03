const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    story_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story", // Reference to the Story model
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Like", likeSchema);