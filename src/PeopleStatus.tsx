import React, { useEffect, useState } from "react";
import { Person, RSVP_Options } from "./types";
import { fetchAllPeople } from "./utilities";

export const PeopleStatus: React.FC<{ status: RSVP_Options }> = ({
  status
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    fetchAllPeople().then((people) => {
      const peopleToDisplay = people.filter(
        (person) =>
          person.rsvp === status || person.extra_confirmed === status
      );
      setPeople(peopleToDisplay);
    });
  }, [status]);
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
