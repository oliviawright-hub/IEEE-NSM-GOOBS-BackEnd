const config = require("config");
const { User } = require("../user");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("received!");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("received!2");

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  console.log("received!3");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  console.log("received!4");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  console.log("received!5");

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Recommended for HTTPS
    sameSite: "strict", // or 'lax' or 'none' depending on your needs
    // Other options like 'domain', 'path', 'expires' can be set as needed
  });

  console.log("received!6");

  res.status(204).send();
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(400).send("User not found.");
  res.send(user);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req, { abortEarly: false });
}

module.exports = router;
