const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true, minlength: 3 },
        director: { type: String, required: true },
        year: { type: Number, max: 2023, required: true },
        genre: { type: [String], required: true, enum: ['Action', 'Adventure', 'Animated', 'Comedy', 'Drama', 'Fantasy', 'Historical', 'Horror', 'Noir', 'Science-fiction', 'Thriller', 'Western'] },
        picture: String
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;