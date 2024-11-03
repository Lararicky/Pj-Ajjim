const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    contribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contribution", // Reference to the Contribution model
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", commentSchema);