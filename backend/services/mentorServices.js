const mentorModel = require("../models/mentorModel");

module.exports.createMentor = async ({
    name,
    email,
    password,
    expertise,
    yearsOfExperience,
    highestDegree,
    otherDegrees,
}) =>{

    const errors = [];

    if (!name) errors.push("Name is required.");
    if (!email) errors.push("Email is required.");
    if (!password) errors.push("Password is required.");
    if (!highestDegree) errors.push("Highest degree is required.");
    if (!yearsOfExperience) errors.push("Years of experience is required.");
    if (!expertise || expertise.length < 1) errors.push("At least one interest is required.");


    if (errors.length > 0) {
        const error = new Error("Validation error");
        error.details = errors;
        throw error;
    }


    const mentor = await mentorModel.findOne({email});
    if(mentor){
        throw new Error("Email already exists");
    }

    const hashedPassword = await mentorModel.hashPassword(password);

    const newMentorData = {
        name,
        email,
        password: hashedPassword,
        expertise,
        yearsOfExperience,
        highestDegree,
        otherDegrees,
    };

    const newMentor = await mentorModel.create(newMentorData);

    return newMentor;
}

