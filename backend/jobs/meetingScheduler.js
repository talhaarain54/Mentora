const cron = require('node-cron');
const mongoose = require('mongoose');
const meetingModel = require("../models/meetingModel") 

// Schedule a task to run every minute
cron.schedule('*/1 * * * *', async () => {
    console.log("Running meeting status update task...");

    try {
        const currentTime = new Date();

        // Find meetings that are scheduled but time has passed
        const scheduledMeetings = await meetingModel.find({
            meetingTime: { $lt: currentTime }, 
            status: 'scheduled' 
        });

        for (let meeting of scheduledMeetings) {
            meeting.status = 'completed';
            await meeting.save();
            console.log(`Meeting with ID ${meeting._id} has been marked as completed.`);
        }

        // Find meetings that are pending but time has passed
        const pendingMeetings = await meetingModel.find({
            meetingTime: { $lt: currentTime },
            status: 'pending' 
        });

        for (let meeting of pendingMeetings) {
            meeting = await meetingModel.findOneAndUpdate(
                { _id: meeting._id },
                {
                    $set: {
                        status: 'cancelled',
                        feedback: 'Meeting is cancelled because the mentor had not accepted the request'
                    }
                },
                { new: true }
            );

            console.log(`Meeting with ID ${meeting._id} has been marked as canceled.`);

        }

        if (scheduledMeetings.length === 0 && pendingMeetings.length === 0) {
            console.log("No meetings to update.");
        }

    } catch (error) {
        console.error('Error in Cron job:', error);
    }
});
