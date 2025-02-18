require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 5000; // Backend runs on port 5000

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Route to Send SMS
app.post('/send-sms', async (req, res) => {
    const { to, message } = req.body;

    try {
        const response = await client.messages.create({
            body: message,
            from: fromNumber,
            to: to
        });
        res.json({ success: true, messageId: response.sid });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
    console.log('Message send successfully');
});
