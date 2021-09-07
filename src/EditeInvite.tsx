import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { API_ENDPOINT } from "./config";
import { Person } from "./types";

export const EditInvite: React.FC<RouteComponentProps> = ({
  match
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const { id } = match.params as { id: string };
  useEffect(() => {
    fetch(`${API_ENDPOINT}/people/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((people: Person[]) => setPeople(people));
  }, []);
  return (
    <section>
      {people.map((person) => {
        return (
          <React.Fragment key={person.id}>
            <p>
              {person.first_name}, {person.last_name}
            </p>
          </React.Fragment>
        );
      })}
    </section>
  );
};
