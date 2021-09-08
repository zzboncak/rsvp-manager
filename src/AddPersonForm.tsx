import React, { useState } from "react";
import { API_ENDPOINT } from "./config";
import { Age, PersonRequest, RSVP_Options } from "./types";

type YesOrNo = "Yes" | "No";

export const AddPersonForm: React.FC<{
  family_id: number;
  last_name: string;
  closeForm: () => void;
}> = ({ family_id, last_name, closeForm }) => {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_nameState, setLast_name] = useState<string>(last_name);
  const [person_age, setAge] = useState<Age>(Age.ADULT);
  const [rsvp, setRsvp] = useState<RSVP_Options>(
    RSVP_Options.NO_RESPONSE
  );
  const [allowed_extra, setAllowed_Extra] = useState<YesOrNo>("No");

  function handleAddPerson(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const allowedExtraBool = allowed_extra === "Yes";
    const payload: PersonRequest = {
      family_id,
      first_name,
      last_name: last_nameState,
      person_age,
      rsvp,
      allowed_extra: allowedExtraBool
    };
    fetch(`${API_ENDPOINT}/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      closeForm();
    });
  }
  return (
    <form onSubmit={(e) => handleAddPerson(e)}>
      <label htmlFor="first_name">First Name: </label>
      <input
        type="text"
        name="first_name"
        value={first_name}
        onChange={(e) => setFirst_name(e.target.value)}
        required
      />
      <br />
      <label htmlFor="last_name">Last Name: </label>
      <input
        type="text"
        name="last_name"
        value={last_nameState}
        onChange={(e) => setLast_name(e.target.value)}
        required
      />
      <br />
      <label htmlFor="person_age">Last Name: </label>
      <select
        name="person_age"
        value={person_age}
        onChange={(e) => setAge(e.target.value as Age)}
        required
      >
        <option value={Age.ADULT}>{Age.ADULT}</option>
        <option value={Age.CHILD}>{Age.CHILD}</option>
      </select>
      <br />
      <label htmlFor="rsvp">RSVP Status: </label>
      <select
        name="rsvp"
        value={rsvp}
        onChange={(e) => setRsvp(e.target.value as RSVP_Options)}
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
      <label htmlFor="allowed_extra">Allowed a plus one?: </label>
      <select
        name="allowed_extra"
        value={allowed_extra}
        onChange={(e) => setAllowed_Extra(e.target.value as YesOrNo)}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      <br />
      <button type="submit">Add</button>
    </form>
  );
};
