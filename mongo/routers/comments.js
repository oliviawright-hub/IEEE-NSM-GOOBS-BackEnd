const { Comment, validatePost } = require('../comment');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let post = await Post.findOne({ userName: req.body.userName });
    if (post) return res.status(400).send("Post already exists");

    post = new Post(_.pick(req.body, ["userName", "description", "createdAt", "likes", "isPosted"]));
    await post.save();
    res.send(_.pick(post, ["_id", "userName", "description", "createdAt", "likes", "isPosted"]));
});

module.exports = router;
