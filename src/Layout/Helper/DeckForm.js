import React, { useState } from "react";
import { useHistory } from "react-router";
// helper component function
export default function DeckForm(props) {
  const { title = "Deck Form", deckId = null, submitHandler } = props;
  const [name, setName] = useState(props.name ? props.name : ""); // handles name of deck
  const [description, setDescription] = useState(
    props.description ? props.description : ""
  ); // handles the description
  const history = useHistory();
  const cancelHandler = () => {
    history.push("/");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const deck = {
      name,
      description,
    };
    submitHandler(deck);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <h4 className="mt-3">Name</h4>
      <input
        placeholder="Deck Name"
        className="w-100"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>
      <h4 className="mt-3">Description</h4>
      <textarea
        placeholder="Brief description of the deck"
        className="w-100"
        rows={10}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-secondary mr-2 oi mb-1"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary mr-2 oi mb-1"
          onClick={() => {
            const deck = {
              name,
              description,
            };
            if (deckId !== null) {
              deck.id = deckId;
            }
            submitHandler(deck);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
