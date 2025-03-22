const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

// Schema to add comments on post
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    isPosted: Boolean
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        userName: Joi.string().required(),
        description: Joi.string().required(),
        createdAt: Joi.date().default(() => new Date(), 'time of creation'),
        likes: Joi.number().integer().min(0).default(0),
        isPosted: Joi.boolean()
  });
    return schema.validate(comment, { abortEarly: false });
}

exports.Comment = Comment;
exports.validate = validateComment;
