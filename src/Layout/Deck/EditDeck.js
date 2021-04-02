import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "../Helper/DeckForm";
// sibling of Deck, Home, CreateDeck, etc. parent is Layout
export default function EditDeck(props) {
  const history = useHistory();
  const params = useParams();
  const { deckId } = params;

  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    console.log(deckId, "deckId");
    readDeck(Number(deckId), abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = (deck) => {
    const abortController = new AbortController();
    const updatedDeck = { ...deck, id: Number(deckId) };
    updateDeck(updatedDeck, abortController.signal)
      .then((response) => {
        history.push("/");
      })
      .catch(() => console.log("Could not edit deck."));

    return () => abortController.abort();
  };
  console.log(deck, "deck");
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.name}`}>
              <span /> {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      {deck.name && (
        <DeckForm
          title="Edit Deck"
          name={deck.name}
          description={deck.description}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}
