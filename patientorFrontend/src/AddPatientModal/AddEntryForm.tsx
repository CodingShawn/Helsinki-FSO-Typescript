import HealthCheckForm from "./EntryTypeForms/HealthCheckForm";
import React, { useState } from "react";
import { useStateValue } from "../state/state";
import { NewEntryDetails, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Button } from "semantic-ui-react";
import HospitalForm from "./EntryTypeForms/HospitalForm";
import OccupationalHealthForm from "./EntryTypeForms/OccupationalHealthForm";

function AddEntryForm({ id }: { id: string }) {
  const [checkupType, setCheckupType] = useState("");
  const [{ diagnosis }, dispatch] = useStateValue();

  async function onSubmit(values: NewEntryDetails) {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: updatedPatient });
    } catch (error) {
      console.log(error.response?.data || "Unknown Error");
    }
  }

  return (
    <>
      <Button onClick={() => setCheckupType("HealthCheck")}>
        Health Checkup Form
      </Button>
      <Button onClick={() => setCheckupType("Hospital")}>Hospital Form</Button>
      <Button onClick={() => setCheckupType("OccupationalHealth")}>
        Occupational Healthcare Form
      </Button>
      {checkupType === "HealthCheck" && (
        <HealthCheckForm diagnosis={diagnosis} onSubmit={onSubmit} />
      )}
      {checkupType === "Hospital" && (
        <HospitalForm diagnosis={diagnosis} onSubmit={onSubmit} />
      )}
      {checkupType === "OccupationalHealth" && (
        <OccupationalHealthForm diagnosis={diagnosis} onSubmit={onSubmit} />
      )}
    </>
  );
}

export default AddEntryForm;
