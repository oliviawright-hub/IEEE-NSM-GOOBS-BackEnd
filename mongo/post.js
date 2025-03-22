const Joi = require('joi');
const mongoose = require('mongoose');

// Post related media schema, description needed but image is optional
const postSchema = new mongoose.Schema({
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
  isPosted: Boolean
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
  const schema = Joi.obj({
    userName: Joi.string().required(),
    image: Joi.string().uri().allow('', null),
    description: Joi.string().required(),
    createdAt: Joi.date().default(() => new Date(), 'time of creation'),
    likes: Joi.number().integer().min(0).default(0),
    isPosted: Joi.boolean()
  });
    return schema.validate(post, { abortEarly: false });
} 

exports.Post = Post;
exports.validatePost = validatePost;
