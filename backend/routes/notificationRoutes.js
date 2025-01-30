const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { authUser } = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");


router.post("/mark-read",
    body("notificationId").isMongoId().withMessage("Notification Id is incorrect"),
    authUser, notificationController.markNotificationRead);


module.exports = router;