import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { AddInvite } from "./AddInvite";
import "./App.css";
import { EditInvite } from "./EditeInvite";
import { NotResponded } from "./NotResponded";
import { Overview } from "./Overview";

function App(): JSX.Element {
  return (
    <div className="App">
      <nav className="nav-bar">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/add-invites">Add invites</Link>
          <Link to="/not-responded">Not Responded</Link>
        </header>
      </nav>

      <Switch>
        <Route path="/not-responded" component={NotResponded} />
        <Route path="/add-invites" component={AddInvite} />
        <Route path="/edit-invite/:id" component={EditInvite} />
        <Route exact path="/" component={Overview} />
      </Switch>
    </div>
  );
}

export default App;
