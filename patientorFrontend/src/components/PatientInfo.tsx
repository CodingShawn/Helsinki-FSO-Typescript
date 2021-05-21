import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

function PatientInfo() {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  async function getPatientDetails() {
    try {
      const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatientData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    void getPatientDetails();
  }, []);

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
        <div key={entry.id}>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default PatientInfo;
