import { Formik, Field, Form } from "formik";
import { Button } from "semantic-ui-react";
import { TextField } from "../FormField";
import { DiagnosisSelection } from "../FormField";
import React from "react";
import { EntryFormProps } from "../../types";

function HospitalForm({ onSubmit, diagnosis }: EntryFormProps) {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {
          date: "",
          criteria: "",
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
        if (values.type !== "Hospital") {
          errors.type = "Wrong type selected";
        }
        if (
          values.type === "Hospital" &&
          (!values.discharge.date || !values.discharge.criteria)
        ) {
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
              label="Discharge Date"
              name="discharge.date"
              placeholder="Dischage Date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              name="discharge.criteria"
              placeholder="Dischage Criteria"
              component={TextField}
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

export default HospitalForm;
