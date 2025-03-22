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

const server = app.listen(port, () => {
  console.log(`Server Running!`);
});

module.exports = server;
