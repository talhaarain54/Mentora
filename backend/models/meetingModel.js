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
    MeetingTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ["request pending", "request rejected", "scheduled", "completed", "cancelled"],
    },
    feedback: {
        type: String,
    },
    meetingUrl: {
        type: String,
    },
});


const meetingModel = mongoose.Schema("meeting", meetingSchema);

module.exports = meetingModel;