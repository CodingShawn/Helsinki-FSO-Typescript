import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_request, response) => {
  return response.status(200).send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
