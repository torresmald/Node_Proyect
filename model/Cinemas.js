const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true, unique: true },
        movies: { type: mongoose.Types.ObjectId, ref: 'Movie' },
        number_theater: Number
    },
    {
        timestamps: true
    });

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;