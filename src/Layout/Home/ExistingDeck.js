import React from "react";
import { Link } from "react-router-dom";
import DeleteDeckButton from "../Helper/DeleteDeckButton";
// Parent is Home to this component
export default function ExistingDeck(props) {
  const { deck, decks, setDecks } = props;
  const length = deck.cards.length;

  return (
    <div key={deck.id} className="card mb-1">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{deck.name}</h5>
          <small>{length} cards</small>
        </div>
        <p>{deck.description}</p>
        <Link
          to={`/decks/${deck.id}`}
          className="btn btn-secondary mr-1 oi oi-eye"
        >
          {" "}
          View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          className="btn btn-primary mr-1 oi oi-book"
        >
          {" "}
          Study
        </Link>
        <DeleteDeckButton decks={decks} deckId={deck.id} setDecks={setDecks} />
      </div>
    </div>
  );
}
