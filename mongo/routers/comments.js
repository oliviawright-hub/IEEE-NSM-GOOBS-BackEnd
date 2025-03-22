const { Comment, validateComment } = require('../comment');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const auth = require('../auth'); // Adjust the path as needed

router.post("/", auth, async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");

    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let comment = await Comment.findOne({ username: req.body.username, description: req.body.description });
    if (comment) return res.status(400).send("Comment already exists");

    comment = new Comment(_.pick(req.body, ["username", "image", "description", "createdAt", "isPosted"]));
    await comment.save();
    res.send(_.pick(comment, ["_id", "username", "description", "createdAt", "isPosted"]));
});

module.exports = router;
