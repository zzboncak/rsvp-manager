import React, { useState } from "react";
import { useHistory } from "react-router";
import { API_ENDPOINT } from "./config";
import { InviteRequest } from "./types";

export const AddInvite: React.FC = () => {
  const history = useHistory();
  const [family_name, setFamilyName] = useState<string>("");
  const [head_of_house, setHoH] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  function handleAddInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: InviteRequest = {
      family_name,
      head_of_house,
      keyword
    };
    fetch(`${API_ENDPOINT}/invites`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        history.push("/");
      });
  }

  return (
    <form onSubmit={(e) => handleAddInvite(e)}>
      <label htmlFor="family_name">Family Name: </label>
      <input
        type="text"
        name="family_name"
        value={family_name}
        onChange={(e) => setFamilyName(e.target.value)}
        required
      />
      <br />
      <label htmlFor="head_of_house">Head of House: </label>
      <input
        type="text"
        name="head_of_house"
        value={head_of_house}
        onChange={(e) => setHoH(e.target.value)}
        required
      />
      <br />
      <label htmlFor="keyword">keyword for lookup: </label>
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Invite</button>
    </form>
  );
};
