import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { AddPersonForm } from "./AddPersonForm/AddPersonForm";
import { API_ENDPOINT } from "./config";
import { EditPeople } from "./EditPeople/EditPeople";
import { Invite, Person } from "./types";
import { fetchInviteAndPeople } from "./utilities";

export const EditInvite: React.FC<RouteComponentProps> = ({
  match
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isAddFormVisible, setVisible] = useState<boolean>();
  const [changes, setChanges] = useState<number>(0);
  const [editKeyword, setEditKeyword] = useState<boolean>(false);
  const { keyword } = match.params as { keyword: string };
  const [updatedKeyword, setUpdatedKeyword] = useState<string>(
    keyword
  );
  const [invite, setInvite] = useState<Invite | undefined>(undefined);
  const history = useHistory();

  function closeForm() {
    setVisible(false);
  }

  function removePerson(personId: number) {
    const newList = people.filter((person) => person.id !== personId);
    setPeople(newList);
  }

  function handleUpdateKeyword() {
    fetch(`${API_ENDPOINT}/invites/update/${invite?.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ keyword: updatedKeyword })
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Disaster");
      }
      setEditKeyword(false);
      history.push(`/edit-invite/${updatedKeyword}`);
    });
  }
  useEffect(() => {
    fetchInviteAndPeople(keyword).then(([invite, people]) => {
      const sortedPeople = people.sort((a, b) => a.id - b.id);
      setPeople(sortedPeople);
      setInvite(invite);
    });
  }, [isAddFormVisible, changes]);
  return (
    <>
      {!editKeyword && (
        <h3>
          Family Keyword:{" "}
          <span onClick={() => setEditKeyword(true)}>{keyword}</span>
        </h3>
      )}
      {editKeyword && (
        <h3>
          Family Keyword:{" "}
          <input
            type="text"
            value={updatedKeyword}
            onChange={(e) => setUpdatedKeyword(e.target.value)}
          />
          <button onClick={() => handleUpdateKeyword()}>
            Update
          </button>
        </h3>
      )}
      <section>
        {people.map((person) => (
          <EditPeople
            {...person}
            updateInvite={removePerson}
            key={person.id}
            changes={changes}
            setChanges={setChanges}
          />
        ))}
      </section>
      <section>
        <h3>Family responses</h3>
        <h4>Dietary Restrictions</h4>
        <p>{invite?.dietary_restrictions}</p>
        <h4>Song that will get them to dance</h4>
        <p>{invite?.favorite_song}</p>
      </section>
      {isAddFormVisible && (
        <AddPersonForm
          family_id={people[0]?.family_id}
          last_name={people[0]?.last_name ?? ""}
          closeForm={closeForm}
        />
      )}
      {!isAddFormVisible && (
        <button onClick={() => setVisible(true)}>
          Add a person to this invitation
        </button>
      )}
    </>
  );
};
