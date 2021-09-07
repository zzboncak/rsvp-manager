import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "./config";
import { Invite } from "./types";

export const InviteRow: React.FC<Invite> = (invite) => {
  const [peopleCount, setPeopleCount] = useState(0);

  const { id } = invite;
  useEffect(() => {
    fetch(`${API_ENDPOINT}/people/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((people) => setPeopleCount(people.length));
  }, []);

  return (
    <Link to={`/edit-invite/${id}`}>
      <article>
        <p>
          The {invite.head_of_house} {invite.family_name} family{" "}
          {peopleCount}
        </p>
      </article>
    </Link>
  );
};
