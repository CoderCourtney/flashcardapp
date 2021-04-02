import React, { Fragment, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import CreateDeck from "./Deck/CreateDeck";
import Deck from "./Deck/Deck";
import EditDeck from "./Deck/EditDeck";
import AddCards from "./Card/AddCards";
import EditCard from "./Card/EditCard";
import Study from "./Deck/Study";

function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/:deckId/cards/new">
            <AddCards />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study decks={decks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck decks={decks} />
          </Route>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
