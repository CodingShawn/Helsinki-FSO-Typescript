import { Formik, Field, Form } from "formik";
import { Button } from "semantic-ui-react";
import React from "react";
import { useStateValue } from "../state/state";
import { TextField } from "./FormField";
import { Entry, NewEntryDetails } from "../types";
import { DiagnosisSelection } from "./FormField";
import { NumberField } from "./FormField";
import axios from "axios";
import { apiBaseUrl } from "../constants";



function AddEntryForm({id}: {id: string}) {
  const [{ diagnosis }] = useStateValue();

  async function onSubmit(values: NewEntryDetails) {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(newEntry);
    } catch (error) {
      console.log(error.response?.data || "Unknown Error");
    }
  }

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: 0,
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
    >
      {function ({ isValid, dirty, setFieldValue, setFieldTouched }) {
        return (
          <Form>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Button type="submit" color="green" disabled={!dirty || !isValid}>
              Add Entry
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEntryForm;
