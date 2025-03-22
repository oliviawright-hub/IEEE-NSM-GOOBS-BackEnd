const Joi = require('joi');
const mongoose = require('mongoose');

// Schema to add comments on post
const commentSchema = new mongoose.Schema({
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
