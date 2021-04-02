import React, { useState } from "react";
import { useHistory } from "react-router";

// helper component function
export default function CardForm(props) {
  const { title, deckId = null, submitHandler, cardType } = props;

  const [front, setFront] = useState(props.front ? props.front : ""); // handles name of card
  const [back, setBack] = useState(props.back ? props.back : ""); // handles the front and back
  const history = useHistory();
  const doneHandler = () => {
    history.push(`/decks/${deckId}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      front,
      back,
    };
    submitHandler(card, setFront, setBack);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        <span>{title}</span>
        {title ? ": " : ""}
        <span>{cardType}</span>
      </h2>
      <h4 className="mt-3">Front</h4>
      <textarea
        placeholder="Front side of card"
        className="w-100"
        rows={5}
        value={front}
        onChange={(event) => setFront(event.target.value)}
      ></textarea>
      <h4 className="mt-3">Back</h4>
      <textarea
        placeholder="Back side of card"
        className="w-100"
        rows={5}
        value={back}
        onChange={(event) => setBack(event.target.value)}
      ></textarea>
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-secondary mr-2 oi mb-1"
          onClick={doneHandler}
        >
          {title === "Edit Card" ? "Cancel" : "Done"}
        </button>
        <button type="submit" className="btn btn-primary mr-2 oi mb-1">
          {title === "Edit Card" ? "Submit" : "Save"}
        </button>
      </div>
    </form>
  );
}
