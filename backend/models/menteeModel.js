const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const menteeSchema = mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        required: [true, "Mentee name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email"
        ],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    interests: [
        {
            type: String,
            required: [true, "interests are required"],
        }
    ],
    yearsOfExperience: {
        type: Number,
    },
    highestDegree:{
        institute: {
            type: String,
            required: true,
        },
        degreeName: {
            type: String,
            required: true,
        },
        completionYear: {
            type: String,
            required: true,
        }
    },
    otherDegrees:[
        {
            institute:{
                type: String,
                required: true,
            },
            degreeName: {
                type: String,
                required: true,
            },
            completionYear: {
                type: String,
                required: true,
            }
        }
    ]

});

menteeSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, role: "mentee", email: this.email}, process.env.JWT_SECRET_KEY);
}

menteeSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

menteeSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const menteeModel = mongoose.model("mentee", menteeSchema);

module.exports = menteeModel;