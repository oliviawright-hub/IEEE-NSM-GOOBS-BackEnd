const { http } = require("http");
const express = require("express"); //idk bout this
const app = express(); //idk bout this
const axios = require("axios");

class Exercise {
  constructor (name, level, equipment, primaryMuscles, instructions){
    this.name = name;
    this.level = level;
    this.equipment = equipment;
    this.primaryMuscles = primaryMuscles;
    this.instructions = instructions;
  };
}

function getResponse() {
  const url =
    "https://lite.datasette.io/?json=https://github.com/yuhonas/free-exercise-db/blob/main/dist/exercises.json#/data/exercises?_facet_array=primaryMuscles&_facet=force&_facet=level&_facet=equipment";
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching data:", error));
}

function parseResponse(response) {
  return response.map((exercise) => new Exercise(
      exercise.name,
      exercise.level,
      exercise.equipment,
      exercise.primaryMuscles,
      exercise.instructions
    ));
}

// return exercises based on critera
function getExercises(allExercises, level, equipment, primaryMuscles) {
  const matchingExercises = allExercises.filter(exercise => {
    return (!level || exercise.level === level) &&
           (!equipment || exercise.equipment === equipment) &&
           (!primaryMuscles || primaryMuscles.length ===  0 || exercise.primaryMuscles.some(muscle => primaryMuscles.includes(muscle)));
  }).map(exercise => {
    return new Exercise(
      exercise.name,
      exercise.level,
      exercise.equipment,
      exercise.primaryMuscles,
      exercise.instructions
    );
  });

  return matchingExercises;
}

app.get("/exercises", async (req, res) => {
  const data = await getResponse();
  const exercises = parseResponse(data);
  res.json(exercises);
});

app.listen(3000, () => {
console.log(`Server Running!`);
});

module.exports = {
  getResponse,
  parseResponse,
  getExercises,
  Exercise
};
