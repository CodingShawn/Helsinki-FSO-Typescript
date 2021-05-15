import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_request, response) => {
  return response.status(200).send(patientService.getAllNonSensitive());
});

export default router;
