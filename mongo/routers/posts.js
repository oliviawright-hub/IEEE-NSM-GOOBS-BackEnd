const { Post, validatePost } = require('../post');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/", async (req, res) => {
    req.body.userId = req.user.id;

    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let post = await Post.findOne({ userId: req.user.id, description: req.body.description });
    if (post) return res.status(400).send("Post already exists");

    post = new Post(_.pick(req.body, ["userName", "image", "description", "createdAt", "isPosted"]));
    await post.save();
    res.send(_.pick(post, ["_id", "userName", "description", "createdAt", "isPosted"]));
});

module.exports = router;
