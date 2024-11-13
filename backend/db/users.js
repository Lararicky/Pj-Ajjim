const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Middleware สำหรับ hash รหัสผ่านก่อนบันทึก
userSchema.pre("save", async function (next) {
    const user = this;

    // เช็คว่าฟิลด์รหัสผ่านมีการเปลี่ยนแปลงหรือไม่
    if (!user.isModified("password")) return next();

    // hash รหัสผ่านด้วย bcrypt
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// สร้างและ export User model
const User = mongoose.model("User", userSchema);
module.exports = User;
