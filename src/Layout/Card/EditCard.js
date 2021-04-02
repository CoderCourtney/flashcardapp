import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "../Helper/CardForm";

// sibling, parent is layout
export default function EditCard(props) {
  const history = useHistory();
  const params = useParams();
  const { deckId, cardId } = params;

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(Number(deckId), abortController.signal)
      .then(setDeck)
      .catch(console.log);
    readCard(Number(cardId), abortController.signal)
      .then(setCard)
      .catch(console.log);
    return () => abortController.abort();
  }, [cardId, deckId]);

  const submitHandler = (card) => {
    const abortController = new AbortController();
    const updatedCard = { ...card, id: Number(cardId) };
    updateCard(updatedCard, abortController.signal)
      .then((response) => {
        history.push(`/decks/${deckId}`);
      })
      .catch(() => console.log("Could not edit card."));

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
            Edit Card
          </li>
        </ol>
      </nav>
      {card.front && (
        <CardForm
          deckId={deckId}
          cardType="Edit Card"
          front={card.front}
          back={card.back}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}
