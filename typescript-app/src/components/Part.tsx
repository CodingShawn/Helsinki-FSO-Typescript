import React from "react";
import { CoursePart, assertNever } from "../types";

function Part({ coursePart }: { coursePart: CoursePart }) {
  let additionalInfo;
  switch (coursePart.type) {
    case "normal":
      additionalInfo = <div>{coursePart.description}</div>;
      break;
    case "groupProject":
      additionalInfo = <div>Project exercises: {coursePart.groupProjectCount}</div>;
      break;
    case "submission":
      additionalInfo = (
        <>
          <div>{coursePart.description}</div>
          <div>Submit to: {coursePart.exerciseSubmissionLink}</div>
        </>
      );
      break;
    default:
      assertNever(coursePart);
  }

  return (
    <section>
      <h2>{coursePart.name}</h2>
      {additionalInfo}
    </section>
  );
}

export default Part;
