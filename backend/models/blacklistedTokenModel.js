const mongoose = require("mongoose");

const blackListedTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Token will automatically be removed after 24 hour
    }
});

const blackListedTokenModel = mongoose.model("blackListedToken", blackListedTokenSchema);

module.exports = blackListedTokenModel;