import React, { useEffect } from "react";
import { listDecks } from "../../utils/api";
import CreateDeckButton from "../Deck/CreateDeckButton";
import ExistingDeck from "./ExistingDeck";

// index.js Layout is the parent of this component
export default function Home(props) {
  const { decks, setDecks } = props;

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(console.log);
    return () => abortController.abort();
  }, [setDecks]);

  const arrayOfAllDecks = decks.map((deck) => (
    <ExistingDeck key={deck.id} deck={deck} decks={decks} setDecks={setDecks} />
  ));

  return (
    <div>
      <CreateDeckButton />
      {arrayOfAllDecks}
    </div>
  );
}
