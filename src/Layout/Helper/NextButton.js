import React from "react";
import { useHistory } from "react-router-dom";

export default function NextButton({
  flipCard,
  setFlipCard,
  length,
  numberCard,
  setNumberCard,
  setOnCard,
}) {
  const history = useHistory();

  function onClick() {
    if (numberCard < length - 1) {
      setNumberCard(numberCard + 1);
      setFlipCard(false);
      setOnCard(false);
    } else {
      if (window.confirm("Restart cards?")) {
        setNumberCard(0);
        setOnCard(false);
      } else {
        history.push("/");
      }
    }
  }

  return (
    <button className="btn btn-primary ml-1 oi" onClick={() => onClick()}>
      Next Card
    </button>
  );
}
