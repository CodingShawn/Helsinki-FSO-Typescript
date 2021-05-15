import diagnosesData from "../data/diagnoses";
import { Diagnose } from "../types";

const data: Array<Diagnose> = diagnosesData;

function getAll(): Array<Diagnose> {
  return data;
}

export default { getAll };
