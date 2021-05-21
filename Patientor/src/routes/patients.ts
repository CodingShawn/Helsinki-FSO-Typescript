import express from "express";
import patientService from "../services/patientService";
import { toNewPatientData } from "../utils";

const router = express.Router();

router.get("/", (_request, response) => {
  return response.status(200).send(patientService.getAllNonSensitive());
});

router.get("/:id", (request, response) => {
  const id = request.params.id;
  return response.status(200).send(patientService.getPatient(id));
});

router.post("/", (request, response) => {
  try {
    const parsedPatientData = toNewPatientData(request.body);

    const newPatientData = patientService.addNewPatient(parsedPatientData);
    return response.status(200).send(newPatientData);
  } catch (error) {
    console.log(error.message);
    return response.status(400).send(error.message);
  }
});

export default router;
