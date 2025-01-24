const {validationResult} = require("express-validator");
const mentorService = require("../services/mentorServices");
const mentorModel = require("../models/mentorModel");

module.exports.registerMentor = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, expertise, yearsOfExperience, highestDegree, otherDegrees} = req.body;

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
        return res.status(201).json({newMentor, token});

    } catch (error) {
        console.log("Error creating mentor: ", error);
        return res.status(400).json({message: error.message});
    }
}

module.exports.loginMentor = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {email, password} = req.body;
    const mentor = await mentorModel.findOne({email}).select("+password");
    if(!mentor){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMentorMatch = await mentor.comparePassword(password);
    if(!isMentorMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = mentor.generateAuthToken();
    mentor.password = undefined;
    res.cookie("token", token);
    return res.status(200).json({mentor, token});
}
