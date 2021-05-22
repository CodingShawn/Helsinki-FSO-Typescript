import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "../AddPatientModal/AddEntryForm";
import { useStateValue } from "../state";
import { Patient } from "../types";

function PatientInfo() {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  let patientData: Patient = patients[id];
  console.log(patients);
  

  useEffect(() => {
    patientData = patients[id];
  }, [patients]);

  if (!patientData) {
    return null;
  }

  return (
    <section>
      <h2>
        {patientData.name}{" "}
        {patientData.gender === "male" ? (
          <Icon name="mars" />
        ) : (
          <Icon name="venus" />
        )}
      </h2>
      <div>ssn: {patientData.ssn}</div>
      <div>Occupation: {patientData.occupation}</div>
      <h3>Entries</h3>
      {patientData.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryForm id={id} />
    </section>
  );
}

export default PatientInfo;
