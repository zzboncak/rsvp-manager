import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "./config";
import { Invite, Person } from "./types";

export const InviteRow: React.FC<
  Invite & {
    removeInvite: (index: number) => void;
    forceRefresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  }
> = (props) => {
  const [peopleCount, setPeopleCount] = useState(0);

  const {
    keyword,
    removeInvite,
    family_name,
    head_of_house,
    id,
    forceRefresh,
    setRefresh
  } = props;
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
  function handleRemoveInvite() {
    if (
      window.confirm(
        "Are you sure you want to remove this family? This action cannot be undone and will also delete all the people contained within the family. Continue?"
      )
    ) {
      fetch(`${API_ENDPOINT}/invites/delete/${id}`, {
        method: "DELETE"
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setRefresh(forceRefresh + 1);
        removeInvite(id);
      });
    }
  }

  return (
    <>
      <Link to={`/edit-invite/${keyword}`}>
        <article>
          <p>
            The {head_of_house} {family_name} family {peopleCount}
          </p>
        </article>
      </Link>
      <span onClick={() => handleRemoveInvite()}>REMOVE 🗑</span>
    </>
  );
};
