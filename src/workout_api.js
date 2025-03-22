const { http } = require("http");
const express = require("express"); //idk bout this
const app = express(); //idk bout this
const axios = require("axios");

class Exercise {
  constructor(name, level, equipment, primaryMuscles, instructions) {
    this.name = name;
    this.level = level;
    this.equipment = equipment;
    this.primaryMuscles = primaryMuscles;
    this.instructions = instructions;
  }
}

// returns response from API
function getResponse() {
  const url = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
  return axios.get(url);
}

// parseResponse expects the response frorm getResponse
function parseResponse(response) {
  return response.map((exercise) => new Exercise(exercise.name, exercise.level, exercise.equipment, exercise.primaryMuscles, exercise.instructions));
}

// return exercises based on array of exercises, level, equipment, and primaryMuscles
function getExercises(allExercises, level, equipment, primaryMuscles) {
  const matchingExercises = allExercises
    .filter((exercise) => {
      return (
        (!level || exercise.level === level) &&
        (!equipment || exercise.equipment === equipment) &&
        (!primaryMuscles || primaryMuscles.length === 0 || exercise.primaryMuscles.some((muscle) => primaryMuscles.includes(muscle)))
      );
    })
    .map((exercise) => {
      return new Exercise(exercise.name, exercise.level, exercise.equipment, exercise.primaryMuscles, exercise.instructions);
    });

  return matchingExercises;
}

module.exports = {
  getResponse,
  parseResponse,
  getExercises,
  Exercise,
};
