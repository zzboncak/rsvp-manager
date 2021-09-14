import React, { useEffect, useState } from "react";
import { InviteRow } from "./InviteRow";
import { Invite, Person, RSVP_Options } from "./types";
import { fetchAllPeople, fetchInvites } from "./utilities";

export const Overview: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [declinedCount, setDeclinedCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [forceRefresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchInvites().then((invites) => setInvites(invites));

    fetchAllPeople().then((people: Person[]) => {
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
  }, [forceRefresh]);

  function removeInvite(index: number) {
    const newInvites = invites.filter(
      (invite) => invite.id !== index
    );
    setInvites(newInvites);
  }

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
      <label htmlFor="search-term">Search Invites: </label>
      <input
        type="text"
        name="search-term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {invitesToShow &&
        invites
          .filter((invite) =>
            invite.family_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((invite) => (
            <InviteRow
              {...invite}
              key={invite.id}
              removeInvite={removeInvite}
              forceRefresh={forceRefresh}
              setRefresh={setRefresh}
            />
          ))}
    </main>
  );
};
