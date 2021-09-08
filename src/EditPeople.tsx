import React from "react";
import { API_ENDPOINT } from "./config";
import { Person } from "./types";

export const EditPeople: React.FC<
  Person & { updateInvite: (personId: number) => void }
> = (props) => {
  const {
    last_name,
    first_name,
    person_age,
    rsvp,
    id,
    updateInvite
  } = props;
  function handleDelete() {
    if (
      window.confirm(
        "Are you sure you want to remove this person? This action cannot be undone, other than manually adding the person again. Continue?"
      )
    ) {
      fetch(`${API_ENDPOINT}/people/delete/${id}`, {
        method: "DELETE"
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        updateInvite(id);
      });
    }
  }
  return (
    <article>
      <h3>
        {first_name} {last_name} {person_age}
      </h3>
      <p>RSVP Status: {rsvp}</p>
      <p>
        REMOVE <span onClick={() => handleDelete()}>😭</span>
      </p>
    </article>
  );
};
