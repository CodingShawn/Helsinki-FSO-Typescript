import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack");
});

app.get("/bmi", (request, response) => {
  const { height, weight } = request.query;

  if (!height || !weight) {
    return response
      .status(400)
      .send({ error: "Insufficient information given!" });
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return response
      .status(400)
      .send({ error: "Values given are not numbers!" });
  }

  const bmiDescription = calculateBMI(Number(height), Number(weight));

  return response.send({
    weight,
    height,
    bmi: bmiDescription,
  });
});

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    target,
    daily_exercises,
  }: { target: string; daily_exercises: Array<string> } = request.body;

  if (!target || !daily_exercises) {
    return response.status(400).send({ error: "Parameters missing" });
  }

  const formattedDailyExercise: Array<number> = daily_exercises.map((exercise) => Number(exercise));

  if (
    isNaN(Number(target)) ||
    formattedDailyExercise.reduce((acc: boolean, exercise: number) => {
      return acc || isNaN(exercise);
    }, false)
  ) {
    return response.status(400).send({ error: "Malformatted parameters" });
  }

  const result = calculateExercises(formattedDailyExercise, Number(target));

  return response.status(200).send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
