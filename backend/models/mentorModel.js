const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mentorSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Mentor name is required"],
    },
    email: {
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
    expertise: [
        {
            type: String,
            required: [true, "Expertise is required"],
        }
    ],
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    highestDegree: {
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
    otherDegrees: [
        {
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
        }
    ],
    meetings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'meeting'
        }
    ],
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notification'
        }
    ]
});


mentorSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: "mentor", email: this.email }, process.env.JWT_SECRET_KEY);
}

mentorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

mentorSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const mentorModel = mongoose.model("mentor", mentorSchema);



module.exports = mentorModel;