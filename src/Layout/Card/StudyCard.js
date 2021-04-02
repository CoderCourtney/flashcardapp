import React, { useState } from "react";
import NextButton from "../Helper/NextButton";

export default function StudyCard(props) {
  const { cards } = props;
  const [numberCard, setNumberCard] = useState(0);
  const [flipCard, setFlipCard] = useState(false);
  const [onCard, setOnCard] = useState(false);

  let content = "";

  if (flipCard) {
    if (cards.length !== 0) {
      content = cards[numberCard].back;
    }
  } else {
    if (cards.length !== 0) {
      content = cards[numberCard].front;
    }
  }
  if (cards.length !== 0) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex  justify-content-between ">
            <h5 className="card-title">{`Card ${numberCard + 1} of ${
              cards.length
            } `}</h5>
          </div>
          <p>{content}</p>
          <button
            className="btn btn-secondary ml-1 oi"
            onClick={() => {
              setFlipCard(!flipCard);
              setOnCard(!onCard);
            }}
          >
            Flip
          </button>
          {onCard ? (
            <NextButton
              flipCard={flipCard}
              setFlipCard={setFlipCard}
              length={cards.length}
              numberCard={numberCard}
              setNumberCard={setNumberCard}
              setOnCard={setOnCard}
            />
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
