// Create app
const express = require('express');
var app = express();

// For communication with frontend
const cors = require("cors");
app.use(cors());

// Connect to database
const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:OmrgjyCi2jFZOnvF@cluster0.avtlu.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>  console.log('Connected to database'))
    .catch((err) => console.error(err));

// Use bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
const profileRouter = require('./api/routes/profile');
app.use('/api/profile', profileRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}

// Start server
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log("Server running on port %s", PORT);
});

// Root
app.get("/", (req, res) => {
    res.json({"message": "OK"});
});



/*

{
    "name": "John Doe",
    "dob": "1970-01-01T00:00:00.000Z",
    "team": "New York Knicks",
    "gender": "male",
    "location": {
        "country": "United States",
        "region": "Massachusetts",
        "city": "Boston"
    },
    "sports": [
        { "name": "golf" },
        { "name": "tennis" },
        { "name": "basketball" }
    ],
    "about": "John Doe plays basketball for the New York Knicks. He also plays golf and tennis.",
    "interests": ["sports", "travel", "dogs"],
    "image": "default"
}
*/