import React from "react";
import { API_ENDPOINT } from "../config";
import { Person, RSVP_Options } from "../types";
import "./EditPeople.css";

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

  function handleGivePlusOne(value: boolean) {
    fetch(`${API_ENDPOINT}/people/update/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ allowed_extra: value })
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setChanges(changes + 1);
    });
  }
  return (
    <article className="edit-person">
      <h3 className="edit-person-header">
        {first_name} {last_name}{" "}
        <i className="person-age">{person_age}</i>
      </h3>
      <label htmlFor="rsvp" className="rsvp-label">
        RSVP Status:{" "}
      </label>
      <select
        className="rsvp-select"
        name="rsvp"
        value={rsvp}
        onChange={(e) =>
          handleRSVPChange(e.target.value as RSVP_Options)
        }
      >
        <option
          className="rsvp-option"
          value={RSVP_Options.NO_RESPONSE}
        >
          {RSVP_Options.NO_RESPONSE}
        </option>
        <option
          className="rsvp-option"
          value={RSVP_Options.WILL_ATTEND}
        >
          {RSVP_Options.WILL_ATTEND}
        </option>
        <option className="rsvp-option" value={RSVP_Options.DECLINE}>
          {RSVP_Options.DECLINE}
        </option>
      </select>
      <br />
      {!allowed_extra && (
        <button
          className="button give-plus-one-button"
          onClick={() => handleGivePlusOne(true)}
        >
          Give a plus one?
        </button>
      )}
      {allowed_extra && (
        <>
          <p className="plus-one-status-text">
            Plus one status:{" "}
            {extra_confirmed ?? RSVP_Options.NO_RESPONSE}
          </p>
          <button
            className="button remove-plus-one-button"
            onClick={() => handleGivePlusOne(false)}
          >
            Remove Plus One
          </button>
        </>
      )}
      <p className="button remove-person-button">
        REMOVE <span onClick={() => handleDelete()}>😭</span>
      </p>
    </article>
  );
};
