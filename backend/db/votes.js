const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    contribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contribution", // Reference to the Contribution model
        required: true
    },
    vote_type: {
        type: String,
        enum: ["upvote", "downvote"],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Vote", voteSchema);