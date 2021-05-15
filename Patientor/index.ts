import express from "express";

const app = express();

app.get("/ping", (_request, response) => {
  return response.status(200).send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
