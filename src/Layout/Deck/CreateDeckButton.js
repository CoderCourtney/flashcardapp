import React from "react";
import { Link } from "react-router-dom";
// Home is the parent to this component
export default function CreateDeckButton() {
  return (
    <Link to="/decks/new">
      <button type="button" className="btn btn-secondary oi oi-plus mb-3">
        {" "}
        Create Deck
      </button>
    </Link>
  );
}
