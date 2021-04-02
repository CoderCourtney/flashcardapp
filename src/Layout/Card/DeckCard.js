import React from "react";
import { Link } from "react-router-dom";
import DeleteCardButton from "../Helper/DeleteCardButton";
// DeckCardList is parent to this component
export default function DeckCard(props) {
  const { card, cards, setCards } = props;
  return (
    <div className="card mb-1">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="w-50 mr-3 justify-content-center">{card.front}</p>
          <p className="w-50 ml-3 justify-content-center">{card.back}</p>
        </div>
        <div className="float-right">
          <Link
            to={`/decks/${card.deckId}/cards/${card.id}/edit`}
            className="btn btn-secondary mr-1 oi oi-pencil"
          >
            {" "}
            Edit
          </Link>
          <DeleteCardButton
            deckId={card.deckId}
            cardId={card.id}
            cards={cards}
            setCards={setCards}
          />
        </div>
      </div>
    </div>
  );
}
