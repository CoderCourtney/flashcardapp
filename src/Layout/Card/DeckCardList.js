import React from "react";
import DeckCard from "./DeckCard";
// Deck is parent to this component
export default function DeckCardList(props) {
  const { cards, setCards } = props;
  return (
    <div className="mt-4">
      <h4>Cards</h4>
      {cards.map((card) => (
        <DeckCard key={card.id} card={card} cards={cards} setCards={setCards} />
      ))}
    </div>
  );
}
