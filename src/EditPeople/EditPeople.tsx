import React, { useState } from "react";
import { API_ENDPOINT } from "../config";
import { Age, Person, RSVP_Options } from "../types";
import { updatePerson } from "../utilities";
import "./EditPeople.css";

export const EditPeople: React.FC<
  Person & {
    updateInvite: (personId: number) => void;
    changes: number;
    setChanges: React.Dispatch<React.SetStateAction<number>>;
  }
> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedFirstName, setFirstName] = useState(props.first_name);
  const [editedLastName, setLastName] = useState(props.last_name);
  const [editedAge, setAge] = useState<Age>(props.person_age);
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

  function handleEdit() {
    updatePerson(id, {
      first_name: editedFirstName,
      last_name: editedLastName,
      person_age: editedAge
    }).then((person) => {
      setAge(person.person_age);
      setFirstName(person.first_name);
      setLastName(person.last_name);
      setEditMode(false);
      setChanges(changes + 1);
    });
  }
  return (
    <article className="edit-person">
      {!editMode && (
        <h3 className="edit-person-header">
          {first_name} {last_name}{" "}
          <i className="person-age">{person_age}</i>{" "}
          <span onClick={() => setEditMode(!editMode)}>✒️</span>
        </h3>
      )}
      {editMode && (
        <>
          <input
            type="text"
            name="edit-first-name"
            value={editedFirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="edit-first-name"
            value={editedLastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <select
            name="person_age"
            value={editedAge}
            onChange={(e) => setAge(e.target.value as Age)}
            required
          >
            <option value={Age.ADULT}>{Age.ADULT}</option>
            <option value={Age.CHILD}>{Age.CHILD}</option>
          </select>
          <button onClick={() => handleEdit()}>
            Make them changes
          </button>
          <br />
        </>
      )}
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
