const { validationResult } = require("express-validator");
const mentorService = require("../services/mentorServices");
const mentorModel = require("../models/mentorModel");

module.exports.registerMentor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, expertise, yearsOfExperience, highestDegree, otherDegrees } = req.body;

    try {
        const newMentor = await mentorService.createMentor({
            name,
            email,
            password,
            expertise,
            yearsOfExperience,
            highestDegree,
            otherDegrees,
        });

        const token = newMentor.generateAuthToken();
        res.cookie("token", token);
        return res.status(201).json({ newMentor, token });

    } catch (error) {
        console.log("Error creating mentor: ", error);
        return res.status(400).json({ message: error.message });
    }
}

module.exports.loginMentor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    const mentor = await mentorModel.findOne({ email }).select("+password");
    if (!mentor) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMentorMatch = await mentor.comparePassword(password);
    if (!isMentorMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = mentor.generateAuthToken();
    mentor.password = undefined;
    res.cookie("token", token);
    return res.status(200).json({ mentor, token });
}

module.exports.getProfile = async (req, res) => {
    res.status(200).json({ mentor: req.mentor });
}

module.exports.getAllMentors = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array() });

    const { name, expertise } = req.query;

    let mentors = [];
    if (name && expertise) {
        mentors = await mentorModel.find({
            name: { $regex: name, $options: 'i' },
            expertise: { $in: expertise }
        });
        // console.log("mentors searched with name and expertise", mentors);

    }
    else if (name) {
        mentors = await mentorModel.find({ name: { $regex: name, $options: 'i' } });
        // console.log("mentors searched with name ", mentors);
    }
    else if (expertise) {
        mentors = await mentorModel.find({ expertise: { $in: expertise } });
        // console.log("mentors searched with expertise", mentors);
    }
    else {
        mentors = await mentorModel.find();
        // console.log("all mentors searched", mentors);
    }

    return res.status(200).json(mentors);
}

module.exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, currentPassword, newPassword, expertise, yearsOfExperience, otherDegrees } = req.body;

    try {
        const mentor = await mentorModel.findById(req.mentor._id).select("+password");
        if (!mentor) {
            return res.status(400).json({ message: "Mentor does not exist" });
        }

        const isPasswordMatch = await mentor.comparePassword(currentPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        let hashedPassword;
        if (newPassword.trim().length === 0) {
            hashedPassword = mentor.password;
        } else {
            hashedPassword = await mentorModel.hashPassword(newPassword);
        }

        const updatedData = {
            password: hashedPassword,
            name,
            expertise,
            yearsOfExperience,
            otherDegrees
        };

        const updatedMentor = await mentorModel.findByIdAndUpdate(req.mentor._id, updatedData, { new: true });

        if (!updatedMentor) {
            return res.status(400).json({ message: "Profile update failed" });
        }

        return res.status(200).json({ message: "Profile updated successfully", mentor: updatedMentor });
    } catch (error) {
        console.log("Error updating mentor: ", error);
        return res.status(500).json({ message: "Internal Server Error, Profile is not updated" });
    }
}

module.exports.deleteProfile = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ message: "Password is required" });
    }

    const { password } = req.body;

    try {
        const mentor = await mentorModel.findById(req.mentor._id).select("+password");
        if (!mentor) {
            return res.status(400).json({ message: "Mentor does not exists" });
        }

        const isPasswordMatch = await mentor.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect" });
        }
        // TODO: When deleting a mentor, also delete their meetings **ONLY IF** the mentee of that meeting is already deleted.
        //       If the mentee still exists, do NOT delete the meeting, as the mentee should retain access to it.
        //       Additionally, ensure proper error handling when fetching meetings and populating it with the mentor or mentee but either a mentor or mentee has been deleted.
        //       If a deleted mentor or mentee is referenced in a meeting, handle it gracefully to prevent application errors.
        await mentor.deleteOne();

        return res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log("Error deleting mentor: ", error);
        return res.status(500).json({ message: "Internal Server Error, Profile is not deleted" });
    }
}

module.exports.logout = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
}