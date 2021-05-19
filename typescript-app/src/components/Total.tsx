import React from "react";
import { CourseProps } from "../types";

function Total({ courseParts }: { courseParts: CourseProps[] }) {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default Total;
