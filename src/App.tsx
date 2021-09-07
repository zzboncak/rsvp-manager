import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <nav className="nav-bar">
        <header className="App-header">
          <Link to="/about">About Us</Link>
          <Link to="/registry">Registry</Link>
          <Link to="/rsvp">RSVP</Link>
          <Link to="/info">Event Info</Link>
        </header>
      </nav>
      <main>
        <h1>We&#39;re getting married</h1>
        <sub>Hel(l yeah)geson</sub>

        <button>RSVP bish</button>
      </main>
    </div>
  );
}

export default App;
