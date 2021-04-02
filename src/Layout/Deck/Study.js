import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "../Card/StudyCard";

export default function Study(props) {
  const params = useParams();
  const { deckId } = params;
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(Number(deckId), abortController.signal)
      .then((response) => {
        setDeck(response);
        setCards(response.cards);
      })
      .catch(console.log);
    return () => abortController.abort();
  }, [deckId]);

  let amountOfCards = cards.length;
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
            Study
          </li>
        </ol>
      </nav>
      <h2>
        <span>{deck.name}</span>: <span>Study</span>
      </h2>
      {amountOfCards > 2 ? (
        <StudyCard cards={cards} />
      ) : (
        <div>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {amountOfCards} cards
            in this deck.
          </p>
        </div>
      )}
    </div>
  );
}
