const express = require('express');
const { google } = require('googleapis');
const app = express();

app.use(express.json());

// Google Calendar setup (requires API key and calendar ID)
const calendar = google.calendar({ version: 'v3', auth: 'YOUR_API_KEY' });

app.post('/reserve', async (req, res) => {
    const { name, email, date, time } = req.body;
    const event = {
        summary: `Reservation for ${name}`,
        start: { dateTime: `${date}T${time}:00` },
        end: { dateTime: `${date}T${time}:00` }, // Adjust duration
    };
    try {
        await calendar.events.insert({
            calendarId: 'YOUR_CALENDAR_ID',
            resource: event,
        });
        res.send('Reservation confirmed!');
    } catch (error) {
        res.status(500).send('Error syncing with calendar');
    }
});

app.listen(3000, () => console.log('Server running'));
document.getElementById('reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/reserve', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
    });
    alert(await response.text());
});
function openChat() {
    document.getElementById('chat-window').style.display = 'block';
    // Initialize Dialogflow chat
}

function sendMessage(message) {
    if (message.includes('menu')) {
        return 'Our signature cocktail is 120 LSL. Check our menu page!';
    }
    // Add more logic
}