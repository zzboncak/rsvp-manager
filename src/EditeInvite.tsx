import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { AddPersonForm } from "./AddPersonForm";
import { API_ENDPOINT } from "./config";
import { EditPeople } from "./EditPeople";
import { Person } from "./types";

export const EditInvite: React.FC<RouteComponentProps> = ({
  match
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isAddFormVisible, setVisible] = useState<boolean>();
  const [changes, setChanges] = useState<number>(0);

  function closeForm() {
    setVisible(false);
  }

  function removePerson(personId: number) {
    const newList = people.filter((person) => person.id !== personId);
    setPeople(newList);
  }
  const { id } = match.params as { id: number };
  useEffect(() => {
    fetch(`${API_ENDPOINT}/people/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((people: Person[]) => {
        const sortedPeople = people.sort((a, b) => a.id - b.id);
        setPeople(sortedPeople);
      });
  }, [isAddFormVisible, changes]);
  return (
    <>
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
      {isAddFormVisible && (
        <AddPersonForm
          family_id={id}
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