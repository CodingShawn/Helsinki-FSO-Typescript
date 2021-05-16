import patientData from "../data/patients";
import { NonSensitivePatientData, Patient, NewPatientData } from "../types";
import { v1 as uuid } from "uuid";

function getAllNonSensitive(): NonSensitivePatientData[] {
  const nonSensitiveData = patientData.map(
    ({ id, gender, dateOfBirth, occupation, name }) => {
      return {
        id,
        gender,
        dateOfBirth,
        occupation,
        name,
      };
    }
  );
  return nonSensitiveData;
}

function addNewPatient(newPatientDetails: NewPatientData): Patient {
  const id: string = uuid();
  const newPatient = {
    ...newPatientDetails,
    id,
  };
  patientData.push(newPatient);
  return newPatient;
}

export default { getAllNonSensitive, addNewPatient };
