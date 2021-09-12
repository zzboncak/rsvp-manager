import { API_ENDPOINT } from "./config";
import { Invite, Person, PersonRequest } from "./types";

export function fetchAllPeople(): Promise<Person[]> {
  return fetch(`${API_ENDPOINT}/people`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data: Person[]) => data);
}

export function fetchInvites(): Promise<Invite[]> {
  return fetch(`${API_ENDPOINT}/invites`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data: Invite[]) => data);
}

export function updatePerson(
  personId: number,
  fieldsToUpdate: Partial<PersonRequest>
): Promise<Person> {
  return fetch(`${API_ENDPOINT}/people/update/${personId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(fieldsToUpdate)
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((person: Person) => person);
}
