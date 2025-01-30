const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = require("./db/db");
connectDatabase();
require("./jobs/meetingScheduler"); // meeting scheduler
const app = express();
const mentorRoutes = require("./routes/mentorRoutes");
const menteeRoutes = require("./routes/menteeRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/mentor", mentorRoutes);
app.use("/mentee", menteeRoutes);
app.use("/meeting", meetingRoutes);
app.use("/notification", notificationRoutes);



module.exports = app;