const { validationResult } = require("express-validator");
const meetingModel = require("../models/meetingModel");
const mentorModel = require("../models/mentorModel");
const menteeModel = require("../models/menteeModel");
const notificationModel = require("../models/notificationModel");

module.exports.createMeetingRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { meetingTime, mentor, mentee } = req.body;

    try {
        const newMeeting = await meetingModel.create({
            mentor,
            mentee,
            meetingTime,
            status: "pending",
        });

        const updatedMentee = await menteeModel.findByIdAndUpdate(mentee, {
            $push: { meetings: newMeeting._id },
        }, {new: true}); 

        const mentorNotification = await notificationModel.create({
            content: `New Meeting requested by ${updatedMentee.name} at time: ${newMeeting.meetingTime.toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true, month: "short", day: "2-digit", year: "numeric" })}`,
            status: "unread",
            user: mentor,
            userType: "mentor",
            time: Date.now()
        });

        await mentorModel.findByIdAndUpdate(mentor, {
            $push: { meetings: newMeeting._id }
        }); 

        const updatedMentor = await mentorModel.findByIdAndUpdate(mentor, {
            $push: { notifications: mentorNotification._id }
        }, {new: true});

        const menteeNotification = await notificationModel.create({
            content: `New Meeting requested sent to ${updatedMentor.name} at time: ${newMeeting.meetingTime.toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true, month: "short", day: "2-digit", year: "numeric" })}`,
            status: "unread",
            user: mentee,
            userType: "mentee",
            time: Date.now()
        });

        await menteeModel.findByIdAndUpdate(mentee, {
            $push: { notifications: menteeNotification._id }
        }, {new: true});

        return res.status(201).json({message: "Meeting Created Successfully", newMeeting});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports.accpetMeetingRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { meetingId, meetingUrl  } = req.body;
    try {
        const updatedMeeting = await meetingModel.findByIdAndUpdate(
            meetingId, 
            { $set: { status: "scheduled", meetingUrl } },
            { new: true }
        );

        if (!updatedMeeting) { return res.status(404).json({ message: "Meeting not found" }); }

        const mentor = await mentorModel.findById(updatedMeeting.mentor);

        const newNotification = await notificationModel.create({
            content: `Meeting request accepted by ${mentor.name} at time: ${updatedMeeting.meetingTime.toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true, month: "short", day: "2-digit", year: "numeric" })}`,
            status: "unread",
            user: updatedMeeting.mentee,
            userType: "mentee",
            time: Date.now()
        });
        const updatedMentee =  await menteeModel.findByIdAndUpdate(updatedMeeting.mentee, {
            $push: { notifications: newNotification._id }
        }, {new: true});

        return res.status(200).json({message: "Meeting scheduled successfully", updatedMeeting});
    } catch (error) {
        console.log("Error accepting the meeting request: ", error);
        return res.status(500).json({message: "Internal server Error"});
    }
}

module.exports.cancelMeetingRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { meetingId  } = req.body;
    try {
        const meeting = await meetingModel.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        if (meeting.status === "cancelled") {
            return res.status(400).json({ message: "Meeting is already cancelled" });
        }

        const updatedMeeting = await meetingModel.findByIdAndUpdate(meetingId, 
            { $set: { status: "cancelled"}},
            {new: true}
        );

        const mentor = await mentorModel.findById(updatedMeeting.mentor);
        const mentee = await menteeModel.findById(updatedMeeting.mentee);

        const mentorNotification = await notificationModel.create({
            content: `Meeting cancelled with ${mentee.name} at time: ${updatedMeeting.meetingTime.toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true, month: "short", day: "2-digit", year: "numeric" })}`,
            status: "unread",
            user: mentor,
            userType: "mentor",
            time: Date.now()
        });

        const updatedMentor = await mentorModel.findByIdAndUpdate(mentor._id, {
            $push: { notifications: mentorNotification._id }
        }, {new: true});

        const menteeNotification = await notificationModel.create({
            content: `Meeting cancelled with ${mentor.name} at time: ${updatedMeeting.meetingTime.toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true, month: "short", day: "2-digit", year: "numeric" })}`,
            status: "unread",
            user: mentee,
            userType: "mentee",
            time: Date.now()
        });

        await menteeModel.findByIdAndUpdate(mentee._id, {
            $push: { notifications: menteeNotification._id }
        }, {new: true});
        
        return res.status(200).json({message: "Meeting cancelled successfully", updatedMeeting});
    } catch (error) {
        console.log("Error rejecting/cancelling the meeting request: ", error);
        return res.status(500).json({message: "Internal server Error"});
    }
}

module.exports.addFeedback = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { meetingId, feedback } = req.body;

    try {
        const meeting = await meetingModel.findById(meetingId).populate("mentee");
        if(!meeting){
            return res.status(400).json({message: "Meeting does not exists"});
        }
        if(meeting.status !== "completed"){
            return res.status(400).json({message: "Meeting is not completed yet"});
        }

        const newNotification = await notificationModel.create({
            content: `Feedback added by the ${meeting.mentee.name} at time: ${meeting.meetingTime.toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true, month: "short", day: "2-digit", year: "numeric" })}`,
            status: "unread",
            user: meeting.mentor,
            userType: "mentor",
            time: Date.now()
        });

        const updatedMentor = await mentorModel.findByIdAndUpdate(meeting.mentor, {
            $push: { notifications: newNotification._id }
        }, {new: true});

        meeting.feedback = feedback;
        await meeting.save();
        return res.status(200).json({message: "Feedback added successfully"});

    } catch (error) {
        console.log("Error adding feedback", error);
        return res.status(500).json({message: "Internal Server error"});
    }
}
