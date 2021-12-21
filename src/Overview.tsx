import React, { useEffect, useState } from "react";
import { InviteRow } from "./InviteRow/InviteRow";
import { Invite, Person, RSVP_Options } from "./types";
import { fetchAllPeople, fetchInvites } from "./utilities";

type Count = {
  total: number;
  confirmed: number;
  declined: number;
  noResponse: number;
};

const initialCount: Count = {
  total: 0,
  confirmed: 0,
  declined: 0,
  noResponse: 0
};

export const Overview: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [masterCount, setMasterCount] = useState<Count>(initialCount);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [forceRefresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchInvites().then((invites) => setInvites(invites));

    fetchAllPeople().then((people: Person[]) => {
      const realCount: Count = {
        total: 0,
        confirmed: 0,
        declined: 0,
        noResponse: 0
      };
      people.forEach((person) => {
        console.log(person);
        realCount.total += 1;
        if (person.allowed_extra) {
          realCount.total += 1;
        }
        if (person.rsvp === RSVP_Options.WILL_ATTEND) {
          realCount.confirmed += 1;
        }
        if (
          person.allowed_extra &&
          person.extra_confirmed === RSVP_Options.WILL_ATTEND
        ) {
          realCount.confirmed += 1;
        }
        if (person.rsvp === RSVP_Options.DECLINE) {
          realCount.declined += 1;
        }
        if (
          person.allowed_extra &&
          person.extra_confirmed === RSVP_Options.DECLINE
        ) {
          realCount.declined += 1;
        }
        if (person.rsvp === RSVP_Options.NO_RESPONSE) {
          realCount.noResponse += 1;
        }
        if (
          person.allowed_extra &&
          (person.extra_confirmed === RSVP_Options.NO_RESPONSE ||
            !person.extra_confirmed)
        ) {
          realCount.noResponse += 1;
        }
      });
      setMasterCount(realCount);
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
      <h2>Total Invited: {masterCount.total}</h2>
      <h3>Total Confirmed: {masterCount.confirmed}</h3>
      <h3>Total Decline: {masterCount.declined}</h3>
      <h3>Total Not Responded: {masterCount.noResponse}</h3>
      <label htmlFor="search-term">Search Invites: </label>
      <input
        type="text"
        name="search-term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {invitesToShow &&
        invites
          .filter(
            (invite) =>
              invite.family_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              invite.head_of_house
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
