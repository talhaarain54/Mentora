const jwt = require("jsonwebtoken");
const menteeModel = require("../models/menteeModel");
const mentorModel = require("../models/mentorModel");


const authMentee = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log("req, headers ", req.headers.authorization);
    // console.log("req. headers.authorization", req.headers.authorization);
    
    // console.log("token recieved at authMentee", token);
    if (!token)
        return res.status(401).json({ message: "Unauthorized access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('Token decoded at auth Mentee', decoded);

        const mentee = await menteeModel
            .findById(decoded._id)
            .populate({
                path: "meetings",
                populate: [
                    { path: "mentor", select: "name" },
                    { path: "mentee", select: "name" } 
                ]
            }).populate("notifications");

        req.mentee = mentee;
        // console.log('mentee find at authMentee', mentee)
        if (!mentee)
            return res.status(401).json({ message: "UnAuthorized access" });

        next();
    } catch (error) {
        console.log("Error verifying token", error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}


const authMentor = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log("token recieved at authMentor", token);
    if (!token)
        return res.status(401).json({ message: "Unauthorized access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Token decoded at authMentor", decoded);

        const mentor = await mentorModel
            .findById(decoded._id)
            .populate({
                path: "meetings",
                populate: [
                    { path: "mentor", select: "name" },
                    { path: "mentee", select: "name" }
                ]
            }).populate("notifications");
        req.mentor = mentor;
        // console.log('mentor find at authMentor', mentor)
        if (!mentor)
            return res.status(401).json({ message: "UnAuthorized access" });

        next();
    } catch (error) {
        console.log("Error verifying token", error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log("token recieved at authUser", token);
    if (!token)
        return res.status(401).json({ message: "Unauthorized access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(decoded.role === "mentee"){
            const mentee = await menteeModel.findById(decoded._id);
            req.mentee = mentee;
            next();
        }
        else if(decoded.role === "mentor"){
            const mentor = await mentorModel.findById(decoded._id);
            req.mentor = mentor;
            next();
        }
        else {
            return res.status(400).json({message: "Unauthorized access"});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server error"});
    }
}

module.exports = { authMentee, authMentor, authUser }