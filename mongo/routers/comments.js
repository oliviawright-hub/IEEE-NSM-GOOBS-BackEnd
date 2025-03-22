const { Comment, validatePost } = require('../comment');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/", async (req, res) => {
    req.body.userId = req.user._id;

    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let comment = await Comment.findOne({userId: req.user._id, description: req.body.description });
    if (comment) return res.status(400).send("Comment already exists");

    comment = new Comment(_.pick(req.body, ["userId", "userName", "description", "createdAt", "likes", "isPosted"]));
    await comment.save();
    res.send(_.pick(post, ["_id", "userName", "description", "createdAt", "likes", "isPosted"]));
});

module.exports = router;
