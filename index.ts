import express from "express";
import { calculateBMI } from "./bmiCalculator";

const app = express();

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack");
});

app.get("/bmi", (request, response) => {
  let { height, weight } = request.query;

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

  let bmiDescription = calculateBMI(Number(height), Number(weight));

  return response.send({
    weight,
    height,
    bmi: bmiDescription,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
