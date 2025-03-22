const Joi = require('joi');
const mongoose = require('mongoose');
const { commentSchema } = require('./comment');
Joi.objectId = require('joi-objectid')(Joi);

// Post related media schema, description needed but image is optional
const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes:{
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  isPosted: Boolean
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
    const schema = Joi.object({
      userId: Joi.objectId().required(),
      userName: Joi.string().required(),
      image: Joi.string().uri().allow('', null),
      description: Joi.string().required(),
      createdAt: Joi.date().default(() => new Date(), 'Posted at'),
      likes: Joi.number().integer().min(0).default(0),
      comments: Joi.array().items(Joi.object({
        userId: Joi.objectId().required(),
        userName: Joi.string().required(),
        description: Joi.string().required(),
        createdAt: Joi.date().default(() => new Date(), 'Posted at'),
        likes: Joi.number().integer().min(0).default(0),
        isPosted: Joi.boolean()
      })),
      isPosted: Joi.boolean()
    });
    return schema.validate(post, { abortEarly: false });
  } 

exports.Post = Post;
exports.validatePost = validatePost;
