const mongoose = require("mongoose");

const storyTagSchema = new mongoose.Schema({
    story_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story", // Reference to the Story model
        required: true
    },
    tag_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag", // Reference to the Tag model
        required: true
    }
});

module.exports = mongoose.model("StoryTag", storyTagSchema);