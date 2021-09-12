import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "./config";
import { Invite, Person } from "./types";

export const InviteRow: React.FC<Invite> = (invite) => {
  const [peopleCount, setPeopleCount] = useState(0);

  const { keyword } = invite;
  useEffect(() => {
    fetch(`${API_ENDPOINT}/people/${keyword}`)
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
        setPeopleCount(totalCount);
      });
  }, []);

  return (
    <Link to={`/edit-invite/${keyword}`}>
      <article>
        <p>
          The {invite.head_of_house} {invite.family_name} family{" "}
          {peopleCount}
        </p>
      </article>
    </Link>
  );
};
