import { Entry, NewEntryDetails } from "../types";
import { v1 as uuid } from "uuid";

function addEntry(newEntryDetails: NewEntryDetails): Entry {
  const id: string = uuid();
  const newEntry = {
    ...newEntryDetails,
    id,
  };
  return newEntry;
}

export default { addEntry };
