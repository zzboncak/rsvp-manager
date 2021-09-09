import React, { useEffect, useState } from "react";
import { Person, RSVP_Options } from "./types";
import { fetchPeople } from "./utilities";

export const NotResponded: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    fetchPeople().then((people) => {
      const notResponded = people.filter(
        (person) =>
          person.rsvp === RSVP_Options.NO_RESPONSE ||
          person.extra_confirmed === RSVP_Options.NO_RESPONSE
      );
      setPeople(notResponded);
    });
  }, []);
  return (
    <section>
      {people.map((person) => {
        return (
          <p key={person.id}>
            {person.first_name} {person.last_name} {person.rsvp}
          </p>
        );
      })}
    </section>
  );
};
