const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    time: {
        type: Date,
        required: true,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["read", "unread"],
        default: "unread",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userType", 
    },
    userType: {
        type: String,
        required: true,
        enum: ["mentor", "mentee"],
    },
});


const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = notificationModel;