const mongoose = require('mongoose');

const SportsSchema = mongoose.Schema({
    name: {
        type: String,
        enum: ["golf", "tennis", "cricket", "basketball", "baseball"]
    }
});

const ProfileSchema = mongoose.Schema({
    name: { type: String, required: true },
    dob: Date,
    team: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    location: {
        country: String,
        region: String,
        city: String
    },
    sports: [SportsSchema],
    about: String,
    interests: [String],
    image: String // default?
}, { collection: 'profiles' });

//const Sports = mongoose.model('Sports', SportsSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;