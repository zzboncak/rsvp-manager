import { API_ENDPOINT } from "./config";
import { Invite, Person } from "./types";

export function fetchPeople(): Promise<Person[]> {
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
