import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state/state";
import { assertNever, Entry } from "../types";
import React from "react";

function EntryDetails({ entry }: { entry: Entry }) {
  const [{ diagnosis }] = useStateValue();
  let icon;

  switch (entry.type) {
    case "Hospital":
      icon = <Icon name="hospital outline" />;
      break;
    case "HealthCheck":
      icon = <Icon name="stethoscope" />;
      break;

    case "OccupationalHealthcare":
      icon = <Icon name="user md" />;
      break;

    default:
      assertNever(entry);
  }  
  return (
    <section>
      <h2>
        {entry.date} {icon}
      </h2>
      <div>{entry.description}</div>
      {diagnosis.length !== 0 && <ul>
        {entry.diagnosisCodes?.map((code) => {
          const diagnose = diagnosis.filter(
            (diagnose) => diagnose.code === code
          )[0];
          return <li key={diagnose.code}>
            {diagnose.code} {diagnose.name}
          </li>;
        })}
      </ul>}
    </section>
  );
}

export default EntryDetails;
