import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "../Helper/CardForm";

export default function AddCards() {
  const params = useParams();
  const { deckId } = params;

  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(Number(deckId), abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = (card, setFront, setBack) => {
    const abortController = new AbortController();

    createCard(deckId, card, abortController.signal)
      .then((response) => {
        setFront("");
        setBack("");
      })
      .catch(() => console.log("Could not create card."));

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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Cards
          </li>
        </ol>
      </nav>
      {deck.name && (
        <CardForm
          title={`${deck.name}`}
          cardType="Add Card"
          front=""
          back=""
          deckId={deckId}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}
