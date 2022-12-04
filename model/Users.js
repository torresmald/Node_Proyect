const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 4, maxlength: 15},
    email: {
        type: String, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: {type: String, required: true},
    role: {type: String, enum: ["admin", "user"]}
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;