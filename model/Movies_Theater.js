const mongoose = require('mongoose');

const moviesTheaterSchema = new mongoose.Schema(
    {
        rows: { type: Number, required: true },
        seats: { type: Number, required: true },
        movies: { type: mongoose.Types.ObjectId, ref: 'Movies'}
    },
    {
        timestamps: true
    });

const Theater = mongoose.model('Movie Theater', moviesTheaterSchema);

module.exports = Theater;