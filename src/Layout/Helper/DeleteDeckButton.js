import React from "react";
import { useHistory } from "react-router";
import { deleteDeck } from "../../utils/api/index";

export default function DeleteDeckButton(props) {
  const { decks, setDecks, deckId } = props;
  const history = useHistory();
  const deleteHandler = () => {
    const abortController = new AbortController();
    const confirmBox = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmBox === true) {
      deleteDeck(deckId, abortController.signal)
        .then((response) => {
          const decksToKeep = decks.filter(
            (deckToKeep) => deckToKeep.id !== deckId
          );
          setDecks(() => decksToKeep);
          history.push("/");
        })
        .catch(() => console.log("Could not delete deck."));
    }
    return () => abortController.abort();
  };
  return (
    <button
      className="btn btn-danger mr-1 oi oi-trash float-right"
      onClick={deleteHandler}
    ></button>
  );
}
