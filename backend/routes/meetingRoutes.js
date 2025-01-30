const express = require("express");
const { body} = require("express-validator");
const { authMentee, authMentor, authUser } = require("../middlewares/authMiddleware");
const meetingController = require("../controllers/meetingController");
const router = express.Router();


router.post("/create-meeting-request", [
    body("meetingTime").exists({ checkFalsy: true }).withMessage("Datetime is required").isISO8601().withMessage("Datetime must be a valid ISO8601 format")
    .custom((value) => {
        const selectedTime = new Date(value);
        const currentTime = new Date();
        if (selectedTime <= currentTime) {
            throw new Error("Datetime must be in the future");
        }
        return true;
    }),
    body("mentor").isMongoId().withMessage("Mentor id is not valid"),
    body("mentee").isMongoId().withMessage("Mentee id is not valid"),
], authMentee, meetingController.createMeetingRequest);


router.patch("/accept-meeting-request", [
    body("meetingId").isMongoId().withMessage("Meeting id is not valid"),
    body("meetingUrl").isURL({ require_protocol: true }).withMessage("Meeting Url is incorrect")
], authMentor, meetingController.accpetMeetingRequest);

router.patch("/cancel-meeting-request",
    body("meetingId").isMongoId().withMessage("Meeting id is not valid"),
    authUser, meetingController.cancelMeetingRequest);

router.patch("/add-feedback", [
    body("meetingId").isMongoId().withMessage("Meeting id is not valid"),
    body("feedback").isString().isLength({min: 10}).withMessage("Feedback is required and must be more than 10 characters"),
], authMentee, meetingController.addFeedback);

module.exports = router;