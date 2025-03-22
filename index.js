const express = require("express");
const exercisesAPI = require("./src/workout_api.js");
const app = express();

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
    let primaryMusclesArray = primaryMuscles ? primaryMuscles.split(",") : undefined;

    const data = await getResponse();
    const exercises = parseResponse(data);
    const workoutPlan = createWorkoutPlan(exercises, level, equipment, primaryMusclesArray);
    res.json(workoutPlan);
  } catch (error) {
    res.status(500).send("Failed to create workout plan.");
  }
});

const server = app.listen(port, () => {
  console.log(`Server Running!`);
});

module.exports = server;
