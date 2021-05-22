import { Formik, Field, Form } from "formik";
import { Button } from "semantic-ui-react";
import React from "react";
import { useStateValue } from "../state/state";
import { TextField } from "./FormField";
import { NewEntryDetails, Patient } from "../types";
import { DiagnosisSelection } from "./FormField";
import { NumberField } from "./FormField";
import axios from "axios";
import { apiBaseUrl } from "../constants";

function AddEntryForm({ id }: { id: string }) {
  const [{ diagnosis }, dispatch] = useStateValue();

  async function onSubmit(values: NewEntryDetails) {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(updatedPatient);
      dispatch({ type: "ADD_ENTRY", payload: updatedPatient });
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
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type !== "HealthCheck") {
          errors.type = "No such type selected";
        }
        if (
          values.type === "HealthCheck" &&
          (values.healthCheckRating !== 0 &&
            values.healthCheckRating !== 1 &&
            values.healthCheckRating !== 2 &&
            values.healthCheckRating !== 3)
        ) {
          errors.healthCheckRating = "Invalid value for Health Check Rating";
        }
        return errors;
      }}
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
