import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./App.css";
import { EditInvite } from "./EditeInvite";
import { Overview } from "./Overview";

function App(): JSX.Element {
  return (
    <div className="App">
      <nav className="nav-bar">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/add-invites">Add invites</Link>
        </header>
      </nav>

      <Switch>
        <Route path="/edit-invite/:id" component={EditInvite} />
        <Route exact path="/" component={Overview} />
      </Switch>
    </div>
  );
}

export default App;
