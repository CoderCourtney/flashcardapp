import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeckCardList from "../Card/DeckCardList";
import DeleteDeckButton from "../Helper/DeleteDeckButton";
import { readDeck } from "../../utils/api";
// Layout index.js is the parent to this component
export default function Deck(props) {
  const { decks } = props;
  const params = useParams();
  const { deckId } = params;
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(Number(deckId), abortController.signal)
      .then((deck) => {
        setDeck(deck);
        setCards(deck.cards);
      })
      .catch(console.log);

    return () => abortController.abort();
  }, [deckId]);

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
            {deck.name}
          </li>
        </ol>
      </nav>
      <h3>{deck.name}</h3>
      <h6>{deck.description}</h6>
      <div>
        <Link
          to={`/decks/${deck.id}/edit`}
          className="btn btn-secondary mr-2 oi oi-pencil"
        >
          {" "}
          Edit
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          className="btn btn-primary mr-2 oi oi-book"
        >
          {" "}
          Study
        </Link>
        <Link
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary mr-2 oi oi-plus"
        >
          {" "}
          Add Cards
        </Link>
        <DeleteDeckButton decks={decks} deckId={deckId} setDecks={() => {}} />
      </div>
      <DeckCardList cards={cards} setCards={setCards} />
    </div>
  );
}
