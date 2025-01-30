const { validationResult } = require("express-validator");
const menteeService = require("../services/menteeServices");
const menteeModel = require("../models/menteeModel");


module.exports.registerMentee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, interests, yearsOfExperience, highestDegree, otherDegrees } = req.body;

    try {
        const newMentee = await menteeService.createMentee({
            name,
            email,
            password,
            interests,
            yearsOfExperience,
            highestDegree,
            otherDegrees
        });

        const token = newMentee.generateAuthToken();
        res.cookie("token", token);
        return res.status(201).json({ newMentee, token });

    } catch (error) {
        console.log("Error creating mentee: ", error);
        return res.status(400).json({ message: error.message });
    }
}

module.exports.loginMentee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    const mentee = await menteeModel.findOne({ email }).select("+password");
    if (!mentee) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMenteeMatch = await mentee.comparePassword(password);
    if (!isMenteeMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = mentee.generateAuthToken();
    mentee.password = undefined;
    res.cookie("token", token);
    return res.status(200).json({ mentee, token });
}

module.exports.getProfile = async (req, res) => {
    res.status(200).json({ mentee: req.mentee });
}

module.exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, currentPassword, newPassword, interests, yearsOfExperience, otherDegrees } = req.body;

    try {
        const mentee = await menteeModel.findById(req.mentee._id).select("+password");
        if (!mentee) {
            return res.status(400).json({ message: "Mentee does not exist" });
        }

        const isPasswordMatch = await mentee.comparePassword(currentPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        let hashedPassword;
        if (newPassword.trim().length === 0) {
            hashedPassword = mentee.password;
        } else {
            hashedPassword = await menteeModel.hashPassword(newPassword);
        }

        const updatedData = {
            password: hashedPassword,
            name,
            interests,
            yearsOfExperience,
            otherDegrees
        };

        const updatedMentee = await menteeModel.findByIdAndUpdate(req.mentee._id, updatedData, { new: true });

        if (!updatedMentee) {
            return res.status(400).json({ message: "Profile update failed" });
        }

        return res.status(200).json({ message: "Profile updated successfully", mentee: updatedMentee });
    } catch (error) {
        console.log("Error updating mentee: ", error);
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
        const mentee = await menteeModel.findById(req.mentee._id).select("+password");
        if (!mentee) {
            return res.status(400).json({ message: "Mentee does not exists" });
        }

        const isPasswordMatch = await mentee.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        // TODO: When deleting a mentee, also delete their meetings **ONLY IF** the mentor of that meeting is already deleted.
        //       If the mentor still exists, do NOT delete the meeting, as the mentor should retain access to it.
        //       Additionally, ensure proper error handling when fetching meetings and populating it with the mentor or mentee but either a mentor or mentee has been deleted.
        //       If a deleted mentor or mentee is referenced in a meeting, handle it gracefully to prevent application errors.
        await mentee.deleteOne()

        return res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log("Error deleting mentee: ", error);
        return res.status(500).json({ message: "Internal Server Error, Profile is not deleted" });
    }
}

module.exports.logout = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
}