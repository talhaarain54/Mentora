const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "mentor",
        required: true,
    },
    mentee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "mentee",
        required: true,
    },
    meetingTime: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // default time is 5 days later 
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "scheduled", "completed", "cancelled"],
    },
    feedback: {
        type: String,
    },
    meetingUrl: {
        type: String,
    },
});


const meetingModel = mongoose.model("meeting", meetingSchema);

module.exports = meetingModel;