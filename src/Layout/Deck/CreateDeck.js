import React from "react";
import DeckForm from "../Helper/DeckForm";
import { createDeck } from "../../utils/api";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function CreateDeck() {
  const history = useHistory();
  const submitHandler = (deck) => {
    const abortController = new AbortController();

    createDeck(deck, abortController.signal)
      .then((response) => {
        history.push("/");
      })
      .catch(() => console.log("Could not create deck."));

    return () => abortController.abort();
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        title="Create Deck"
        name=""
        description=""
        submitHandler={submitHandler}
      />
    </div>
  );
}
