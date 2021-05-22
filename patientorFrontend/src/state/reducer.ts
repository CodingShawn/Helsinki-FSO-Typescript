import { State } from "./state";
import { Diagnosis, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "GET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: action.payload,
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export async function PatientListFromApi() {
  try {
    const { data: patientListFromApi } = await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    );
    const data = { type: "SET_PATIENT_LIST", payload: patientListFromApi };
    return parsePatientListFromApi(data);
  } catch (error) {
    console.log(error.message);
  }
}

function parsePatientListFromApi(data: unknown): Action {
  if (!isAction(data)) {
    throw new Error("Not of type Action");
  }
  return data;
}

function isAction(data: unknown): data is Action {
  return true;
}
