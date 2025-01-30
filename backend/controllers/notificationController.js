const { validationResult } = require("express-validator");
const notificationModel = require("../models/notificationModel");
const mentorModel = require("../models/mentorModel");
const menteeModel = require("../models/menteeModel");


module.exports.markNotificationRead = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array() });

    const { notificationId } = req.body;
    try {
        await notificationModel.findByIdAndUpdate(notificationId, { status: "read" }, { new: true });
        const userModel = req.mentor ? mentorModel : req.mentee ? menteeModel : null;
        const userId = req.mentor ? req.mentor._id : req.mentee ? req.mentee._id : null;

        if (!userModel || !userId) {
            return res.status(400).json({ message: "User type not recognized" })
        }

        const user = await userModel.findById(userId)
            .populate({
                path: "meetings",
                populate: [
                    { path: "mentor", select: "name" },
                    { path: "mentee", select: "name" }
                ]
            }).populate("notifications");

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}