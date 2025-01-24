const menteeModel = require("../models/menteeModel");

module.exports.createMentee = async ({
    name,
    email,
    password,
    interests,
    yearsOfExperience,
    highestDegree,
    otherDegrees
}) =>{

    const errors = [];
    
    if (!name) errors.push("Name is required.");
    if (!email) errors.push("Email is required.");
    if (!password) errors.push("Password is required.");
    if (!highestDegree) errors.push("Highest degree is required.");
    if (!interests || interests.length < 1) errors.push("At least one interest is required.");

    if (errors.length > 0) {
        const error = new Error("Validation error");
        error.details = errors;
        throw error;
    }

    const mentee = await menteeModel.findOne({email});
    if(mentee){
        throw new Error("Email already exists");
    }

    const hashedPassword = await menteeModel.hashPassword(password);
    const newMenteeData = {
        name,
        email,
        password: hashedPassword,
        highestDegree,
        interests,
    };

    if(yearsOfExperience)
        newMenteeData.yearsOfExperience = yearsOfExperience;

    if(otherDegrees)
        newMenteeData.otherDegrees = otherDegrees;


    const newMentee = await menteeModel.create(newMenteeData);

    return newMentee;
}

