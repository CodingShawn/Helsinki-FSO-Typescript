import { Formik, Field, Form } from "formik";
import { Button } from "semantic-ui-react";
import { TextField } from "../FormField";
import { DiagnosisSelection } from "../FormField";
import React from "react";
import { EntryFormProps } from "../../types";

function OccupationalHealthForm({
  onSubmit,
  onCancel,
  diagnosis,
}: EntryFormProps) {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
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
        if (values.type !== "OccupationalHealthcare") {
          errors.type = "Wrong type selected";
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.discharge = requiredError;
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
              placeholder="YYYY-MM-DD"
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
              label="Employer"
              name="employerName"
              placeholder="Employer"
              component={TextField}
            />
            <div>Sick Leave (Optional)</div>
            <Field
              label="Start Date"
              name="sickLeave.startDate"
              placeholder="Start date"
              component={TextField}
            />
            <Field
              label="End Date"
              name="sickLeave.endDate"
              placeholder="End date"
              component={TextField}
            />

            <Button type="submit" color="green" disabled={!dirty || !isValid}>
              Add Entry
            </Button>
            <Button onClick={onCancel}>Close Form</Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default OccupationalHealthForm;
