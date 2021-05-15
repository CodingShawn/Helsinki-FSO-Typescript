import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_request, response) => {
  const data = diagnosesService.getAll();
  response.status(200).send(data);
});

export default router;