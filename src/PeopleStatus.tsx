import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Invite, Person, RSVP_Options } from "./types";
import { fetchAllInvitesAndPeople } from "./utilities";
import "./PeopleStatus.css";

export const PeopleStatus: React.FC<{ status: RSVP_Options }> = ({
  status
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  useEffect(() => {
    fetchAllInvitesAndPeople().then(([invites, people]) => {
      const peopleToDisplay = people.filter(
        (person) =>
          person.rsvp === status ||
          person.extra_confirmed === status ||
          (status === RSVP_Options.NO_RESPONSE &&
            person.allowed_extra &&
            !person.extra_confirmed)
      );
      const sortedPeople = peopleToDisplay.sort(
        (a, b) => a.family_id - b.family_id
      );
      setPeople(sortedPeople);
      setInvites(invites);
    });
  }, [status]);
  return (
    <section>
      {people.map((person) => {
        const keyword = invites.find(
          (invite) => invite.id === person.family_id
        )?.keyword;
        return (
          <>
            {status === person.rsvp && (
              <Link
                to={`/edit-invite/${keyword}`}
                key={person.id}
                className="person-link"
              >
                {person.first_name} {person.last_name} {person.rsvp}
              </Link>
            )}
            {person.allowed_extra &&
              status === RSVP_Options.NO_RESPONSE && (
                <Link
                  to={`/edit-invite/${keyword}`}
                  key={`${person.id}-extra`}
                  className="person-link"
                >
                  {person.first_name} {person.last_name}&apos;s extra:
                  {` ${
                    person.extra_confirmed ?? RSVP_Options.NO_RESPONSE
                  }`}
                </Link>
              )}
          </>
        );
      })}
    </section>
  );
};
