const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");
const { body, query } = require("express-validator");
const { authMentor, authMentee } = require("../middlewares/authMiddleware");


router.post("/register", [
    body("name").isString().isLength({ min: 3 }).withMessage("Name must have more than 3 characters"),
    body("email").isEmail().withMessage("Email format is incorrect"),
    body("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Password is not strong"),
    body("expertise").isArray().withMessage("Expertise must be valid"),
    body("yearsOfExperience").isString().withMessage("years of experience must be required"),
    body("highestDegree.institute").isString().withMessage("Highest degree's institute name is required"),
    body("highestDegree.degreeName").isString().withMessage("Highest degree's degree name is required"),
    body("highestDegree.completionYear").isString().withMessage("Highest degree's completion year is required"),
    body("otherDegrees").optional().isArray().withMessage("Other degrees must be in the form or array"),
],
    mentorController.registerMentor
);

router.post("/login", [
    body("email").isEmail().withMessage("Email format is incorrect"),
    body("password").isString().withMessage("Password is required"),
], mentorController.loginMentor);


router.get("/get-profile", authMentor, mentorController.getProfile);

router.get("/get-all-mentors",[
    query("name").optional().isString().withMessage("Name must be a valid string"),
    query("expertise").optional().isArray().withMessage("Expertise must be valid array"),
],
    authMentee, mentorController.getAllMentors);

router.patch("/update-profile", [
    body("name").optional().isString().isLength({ min: 3 }).withMessage("Name must have more than 3 characters"),
    body("currentPassword").isString().withMessage("Password is required"),
    body("newPassword").optional().isStrongPassword().withMessage("New password is not strong enough"),
    body("expertise").optional().isArray().withMessage("Expertise must be valid array"),
    body("yearsOfExperience").optional().isNumeric().withMessage("years of experience must be required"),
    body("otherDegrees").optional().isArray().withMessage("Other degrees must be in the form or array"),
], authMentor, mentorController.updateProfile);

router.delete("/delete-profile", 
    body("password").isString().withMessage("Password is required"),
    authMentor, mentorController.deleteProfile);

router.post("/logout", 
    authMentor, mentorController.logout);

module.exports = router;