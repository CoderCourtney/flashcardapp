import React from "react";
import { useHistory } from "react-router";
import { deleteCard } from "../../utils/api/index";

export default function DeleteCardButton(props) {
  const { cards, setCards, cardId, deckId } = props;
  const history = useHistory();
  const deleteHandler = () => {
    const abortController = new AbortController();
    const confirmBox = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirmBox === true) {
      deleteCard(cardId, abortController.signal)
        .then((response) => {
          const cardsToKeep = cards.filter(
            (cardToKeep) => cardToKeep.id !== cardId
          );
          setCards(() => cardsToKeep);
          history.push(`/decks/${deckId}`);
        })
        .catch(() => console.log("Could not delete card."));
    }
    return () => abortController.abort();
  };
  return (
    <button
      className="btn btn-danger mr-1 oi oi-trash"
      onClick={deleteHandler}
    ></button>
  );
}
