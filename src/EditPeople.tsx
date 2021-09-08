import React from "react";
import { API_ENDPOINT } from "./config";
import { Person, RSVP_Options } from "./types";

export const EditPeople: React.FC<
  Person & {
    updateInvite: (personId: number) => void;
    changes: number;
    setChanges: React.Dispatch<React.SetStateAction<number>>;
  }
> = (props) => {
  const {
    last_name,
    first_name,
    person_age,
    rsvp,
    id,
    updateInvite,
    changes,
    setChanges,
    allowed_extra,
    extra_confirmed
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

  function handleRSVPChange(rsvpStatus: RSVP_Options) {
    fetch(`${API_ENDPOINT}/people/update/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ rsvp: rsvpStatus })
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setChanges(changes + 1);
    });
  }

  function handleGivePlusOne() {
    fetch(`${API_ENDPOINT}/people/update/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ allowed_extra: true })
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setChanges(changes + 1);
    });
  }
  return (
    <article>
      <h3>
        {first_name} {last_name} <i>{person_age}</i>
      </h3>
      <label htmlFor="rsvp">RSVP Status: </label>
      <select
        name="rsvp"
        value={rsvp}
        onChange={(e) =>
          handleRSVPChange(e.target.value as RSVP_Options)
        }
      >
        <option value={RSVP_Options.NO_RESPONSE}>
          {RSVP_Options.NO_RESPONSE}
        </option>
        <option value={RSVP_Options.WILL_ATTEND}>
          {RSVP_Options.WILL_ATTEND}
        </option>
        <option value={RSVP_Options.DECLINE}>
          {RSVP_Options.DECLINE}
        </option>
      </select>
      <br />
      {!allowed_extra && (
        <button onClick={() => handleGivePlusOne()}>
          Give a plus one?
        </button>
      )}
      {allowed_extra && (
        <>
          <p>
            Plus one status:{" "}
            {extra_confirmed ? "Coming" : "Not coming"}
          </p>
        </>
      )}
      <p>
        REMOVE <span onClick={() => handleDelete()}>😭</span>
      </p>
    </article>
  );
};
