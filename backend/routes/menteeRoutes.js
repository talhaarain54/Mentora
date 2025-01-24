const express = require("express");
const router = express.Router();
const menteeController = require("../controllers/menteeController");
const { body } = require("express-validator");


router.post("/register", 
    [
    body("name").isString().isLength({ min: 3 }).withMessage("Name must have more than 3 characters"),
    body("email").isEmail().withMessage("Email format is incorrect"),
    body("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Password is not strong"),
    body("interests").isArray().withMessage("Interests must be valid"),
    body("yearsOfExperience").optional().isString().withMessage("years of experience must be required"),
    body("highestDegree.institute").isString().withMessage("Highest degree's institute name is required"),
    body("highestDegree.degreeName").isString().withMessage("Highest degree's degree name is required"),
    body("highestDegree.completionYear").isString().withMessage("Highest degree's completion year is required"),
    body("otherDegrees").optional().isArray().withMessage("Other degrees must be in the form or array"),
], menteeController.registerMentee);

router.post("/login", [
    body("email").isEmail().withMessage("Email format is incorrect"),
    body("password").isString().withMessage("Password is required"),
], menteeController.loginMentee);




module.exports = router;