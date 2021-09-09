import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "./config";
import { InviteRow } from "./InviteRow";
import { Invite, Person, RSVP_Options } from "./types";

export const Overview: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [declinedCount, setDeclinedCount] = useState(0);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/invites`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((invites) => setInvites(invites));

    fetch(`${API_ENDPOINT}/people`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((people: Person[]) => {
        const totalCount = people.reduce((total, person) => {
          if (person.allowed_extra) {
            return total + 2;
          }
          return total + 1;
        }, 0);
        setTotalCount(totalCount);
        setConfirmedCount(
          people.filter(
            (person) => person.rsvp === RSVP_Options.WILL_ATTEND
          ).length
        );
        setDeclinedCount(
          people.filter(
            (person) => person.rsvp === RSVP_Options.DECLINE
          ).length
        );
      });
  }, []);

  const invitesToShow = invites.length > 0;

  return (
    <main>
      <h1>Current Invite List</h1>
      <h2>Total Invited: {totalCount}</h2>
      <h3>Total Confirmed: {confirmedCount}</h3>
      <h3>Total Decline: {declinedCount}</h3>
      <h3>
        Total Not Responded:{" "}
        {totalCount - confirmedCount - declinedCount}
      </h3>
      {invitesToShow &&
        invites.map((invite) => (
          <InviteRow {...invite} key={invite.id} />
        ))}
    </main>
  );
};
