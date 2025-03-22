const express = require("express");
const exercisesAPI = require("./src/workout_api.js");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') // need to switch to come from a config file
 .then(() => console.log('Connected to MongoDB')) // better to use debug module for this
 .catch(err => console.error('Could not connect to MongoDB...', err))

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  weight: int,
  // per exercise map of string to numbers maxPr: int
  // posts objectd
  // progress object to track progress with date
});

app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/exercises", async (req, res) => {
  const dataPromise = exercisesAPI.getResponse();
  dataPromise
    .then((response) => {
      const data = response.data;
      const allExercises = exercisesAPI.parseResponse(data);
      const filteredExercises = exercisesAPI.getExercises(allExercises, req.body.level, req.body.equipment, req.body.primaryMuscles);
      res.send(filteredExercises);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

app.get("/workout", async (req, res) => {
  try {
    const { level, equipment, primaryMuscles } = req.query;
    console.log("level: " + level, " equipment: " + equipment + " primaryMuscles: " + primaryMuscles);
    let primaryMusclesArray = [primaryMuscles];

    const data = await exercisesAPI.getResponse();
    const exercises = exercisesAPI.parseResponse(data);
    const workoutPlan = exercisesAPI.createWorkoutPlan(exercises, level, equipment, primaryMusclesArray);
    res.send(workoutPlan);
  } catch (error) {
    res.status(500).send("Failed to create workout plan: " + error);
  }
});

const server = app.listen(port, () => {
  console.log(`Server Running!`);
});

module.exports = server;
