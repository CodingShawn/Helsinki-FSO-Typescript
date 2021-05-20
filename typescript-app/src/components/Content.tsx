import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
}

export default Content;
