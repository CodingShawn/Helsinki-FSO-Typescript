import patientData from "../data/patients";
import { NonSensitivePatientData } from "../types";

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

export default { getAllNonSensitive };
