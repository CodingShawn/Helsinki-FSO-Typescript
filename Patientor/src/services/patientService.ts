import formattedPatientData from "../data/patients";
import { NonSensitivePatientData, Patient, NewPatientData } from "../types";
import { v1 as uuid } from "uuid";

function getAllNonSensitive(): NonSensitivePatientData[] {
  const nonSensitiveData = formattedPatientData.map(
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

function getPatient(id: string): Patient {
  const patientData = formattedPatientData.filter((data) => data.id === id);
  return patientData[0];
}

function addNewPatient(newPatientDetails: NewPatientData): Patient {
  const id: string = uuid();
  const newPatient = {
    ...newPatientDetails,
    id,
  };
  formattedPatientData.push(newPatient);
  return newPatient;
}

export default { getAllNonSensitive, addNewPatient, getPatient };
