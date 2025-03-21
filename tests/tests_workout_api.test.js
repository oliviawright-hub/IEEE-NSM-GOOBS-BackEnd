jest.mock("axios");

const { getResponse, parseResponse, getExercises, Exercise } = require("../src/workout_api");
const axios = require("axios");

describe("API functions", () => {
  test("get response returns response from api", async () => {
    const SAMPLEDATA = {
      id: "Alternate_Incline_Dumbbell_Curl",
      name: "Alternate Incline Dumbbell Curl",
      force: "pull",
      level: "beginner",
      mechanic: "isolation",
      equipment: "dumbbell",
      primaryMuscles: ["biceps"],
      secondaryMuscles: ["forearms"],
      instructions: [
        "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      ],
      category: "strength",
      images: [
        "Alternate_Incline_Dumbbell_Curl/0.jpg",
        "Alternate_Incline_Dumbbell_Curl/1.jpg",
      ],
    };

    const EXPECTED_KEYS = [
      "id",
      "name",
      "force",
      "level",
      "mechanic",
      "equipment",
      "primaryMuscles",
      "secondaryMuscles",
      "instructions",
      "category",
      "images",
    ];

    axios.get.mockResolvedValue({ data: SAMPLEDATA });

    const response = await getResponse();

    EXPECTED_KEYS.forEach((key) => {
      expect(response).toHaveProperty(key);
    });
  });

  test("parse response returns id, name, level, equipment, primaryMuscles, and instructions", () => {
    const RESPONSE = [{
      id: "Alternate_Incline_Dumbbell_Curl",
      name: "Alternate Incline Dumbbell Curl",
      level: "beginner",
      equipment: "dumbbell",
      primaryMuscles: ["biceps"],
      instructions: [
        "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      ],
    }];

    const EXPECTEDOUTPUT = [ new Exercise(
      "Alternate Incline Dumbbell Curl",
      "beginner",
      "dumbbell",
      ["biceps"],
      [
        "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      ],
    )];

    expect(parseResponse(RESPONSE)).toEqual(EXPECTEDOUTPUT);
  });

  test("getExercises returns an array of Exercise objects that match the criteria", () => {
    const testExercise = [ new Exercise(
      "Alternate Incline Dumbbell Curl",
      "beginner",
      "dumbbell",
      ["biceps"],
      [
        "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      ],
    )];
    
    expect(getExercises(testExercise, "beginner", "dumbbell", ["biceps"])).toEqual(testExercise);
  })

  test("getExercises returns an empty array of no exercises from a list of one exercise if the criteria is not met", () => {
    const testExercise = [ new Exercise(
      "Alternate Incline Dumbbell Curl",
      "beginner",
      "dumbbell",
      ["biceps"],
      [
        "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      ],
    )];

    expect(getExercises(testExercise, "intermediate", "dumbbell", ["biceps"])).toEqual([]);
  })

  test("getExercises returns an exercise even if the criteria is met but one parameter is NULL", () => {
    const testExercise = [ new Exercise(
      "Alternate Incline Dumbbell Curl",
      "beginner",
      "dumbbell",
      ["biceps"],
      [
        "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      ],
    )];

    expect(getExercises(testExercise, "beginner", "dumbbell")).toEqual(testExercise);
  })
  
});
