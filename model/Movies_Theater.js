const mongoose = require('mongoose');

const moviesTheaterSchema = new mongoose.Schema(
    {
        number: {type: Number, unique: true, required: true},
        rows: { type: Number, required: true },
        seats: { type: Number, required: true },
        cinema: [{ type: mongoose.Types.ObjectId, ref: 'Cinema'}],
        movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie'}]
    },
    {
        timestamps: true
    });

const Theater = mongoose.model('Movie Theater', moviesTheaterSchema);

module.exports = Theater;