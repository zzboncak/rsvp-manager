import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { AddInvite } from "./AddInvite";
import "./App.css";
import { EditInvite } from "./EditeInvite";
import { PeopleStatus } from "./PeopleStatus";
import { Overview } from "./Overview";
import { RSVP_Options } from "./types";

function App(): JSX.Element {
  return (
    <div className="App">
      <nav className="nav-bar">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/add-invites">Add invites</Link>
          <Link to="/not-responded">Not Responded</Link>
          <Link to="/yes-responded">Yes RSVPs</Link>
          <Link to="/no-responded">No RSVPs</Link>
        </header>
      </nav>

      <Switch>
        <Route exact path="/not-responded">
          <PeopleStatus status={RSVP_Options.NO_RESPONSE} />
        </Route>
        <Route exact path="/yes-responded">
          <PeopleStatus status={RSVP_Options.WILL_ATTEND} />
        </Route>
        <Route exact path="/no-responded">
          <PeopleStatus status={RSVP_Options.DECLINE} />
        </Route>
        <Route path="/add-invites" component={AddInvite} />
        <Route path="/edit-invite/:keyword" component={EditInvite} />
        <Route exact path="/" component={Overview} />
      </Switch>
    </div>
  );
}

export default App;
