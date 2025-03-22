const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        malength: 50
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        malength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        malength: 1024
    },
    weight: {
        type: Number, 
    },
    maxPr: {
        type: Map,
        of: Number
    }
    // Exercise names as keys and max personal records as values
    // posts objectd
    // progress object to track progress with date
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        weight: Joi.number(),
        maxPr: Joi.object().pattern(Joi.string(), Joi.number())
    });

    return schema.validate(user, { abortEarly: false });
}

exports.User = User;
exports.validate = validateUser;

