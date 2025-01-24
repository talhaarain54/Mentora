const {validationResult} = require("express-validator");
const menteeService = require("../services/menteeServices");
const menteeModel = require("../models/menteeModel");

module.exports.registerMentee = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, interests, yearsOfExperience, highestDegree, otherDegrees} = req.body;

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
        return res.status(201).json({newMentee, token});

    } catch (error) {
        console.log("Error creating mentee: ", error);
        return res.status(400).json({message: error.message});
    }
}


module.exports.loginMentee = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {email, password} = req.body;
    const mentee = await menteeModel.findOne({email}).select("+password");
    if(!mentee){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMenteeMatch = await mentee.comparePassword(password);
    if(!isMenteeMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = mentee.generateAuthToken();
    mentee.password = undefined;
    res.cookie("token", token);
    return res.status(200).json({mentee, token});
}