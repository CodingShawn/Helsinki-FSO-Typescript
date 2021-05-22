import { Formik, Field, Form } from "formik";
import { Button } from "semantic-ui-react";
import { TextField } from "../FormField";
import { DiagnosisSelection } from "../FormField";
import { NumberField } from "../FormField";
import React from "react";
import { EntryFormProps } from "../../types";

function HealthCheckForm({ onSubmit, diagnosis }: EntryFormProps) {
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
          errors.type = "Wrong type selected";
        }
        if (
          values.type === "HealthCheck" &&
          values.healthCheckRating !== 0 &&
          values.healthCheckRating !== 1 &&
          values.healthCheckRating !== 2 &&
          values.healthCheckRating !== 3
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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

export default HealthCheckForm;
