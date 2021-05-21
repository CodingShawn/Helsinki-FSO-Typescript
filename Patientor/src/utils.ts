import { NewPatientData, Fields, Gender } from "./types";

export function toNewPatientData({
  gender,
  dateOfBirth,
  occupation,
  name,
  ssn,
}: Fields): NewPatientData {
  return {
    gender: parseGender(gender),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    occupation: parseOccupation(occupation),
    name: parseName(name),
    ssn: parseSSN(ssn),
    entries: [],
  };
}

function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

function parseGender(gender: unknown): Gender {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(param: any): param is Gender {
  return Object.values(Gender).includes(param);
}

function parseDateOfBirth(dateOfBirth: unknown): string {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date");
  }
  return dateOfBirth;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function parseOccupation(occupation: unknown): string {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
}

function parseName(name: unknown): string {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
}

function parseSSN(ssn: unknown): string {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
}
