import React, { useState } from "react";
import "./App.css";
import { CardState } from "./model";
import Card from "./components/Card";
import Countdown from "./components/Countdown";
import cardSuits from "./components/cardSuits";

export default function App() {
  const initialCards: CardState[] = [];
  for (let i = 0; i < 8; i++) {
    initialCards.push(
      { matchId: i, fold: true, outOfGame: false },
      { matchId: i, fold: true, outOfGame: false }
    );
  }
  const [cards, setCards] = useState(shuffle(initialCards));
  const [score, setScore]: [number, (score: number) => void] = useState(0);

  // function functionName(parameter: parameter's type): return's type { function body }
  function shuffle(array: CardState[]): CardState[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function handleFlip(id: number): void {
    let updatedCards = [...cards];
    let card = { ...updatedCards[id], fold: false };
    updatedCards[id] = card;
    setCards(updatedCards);

    if (
      updatedCards
        .filter((card) => !card.outOfGame)
        .filter((card) => !card.fold).length === 2
    ) {
      let indexes: number[] = [];
      for (let i = 0; i < updatedCards.length; i++) {
        if (!updatedCards[i].fold && !updatedCards[i].outOfGame) {
          indexes.push(i);
        }
      }
      setTimeout(() => {
        handleCheck(indexes[0], indexes[1]);
        indexes = [];
      }, 1000);
    }
  }

  function handleCheck(index1: number, index2: number): void {
    if (cards[index1].matchId === cards[index2].matchId) {
      setScore(score + 1);
      let updatedCards = [...cards];
      let card1 = { ...updatedCards[index1], fold: false, outOfGame: true };
      let card2 = { ...updatedCards[index2], fold: false, outOfGame: true };
      updatedCards[index1] = card1;
      updatedCards[index2] = card2;
      setCards(updatedCards);
    } else {
      let updatedCards = [...cards];
      let card1 = { ...updatedCards[index1], fold: true };
      let card2 = { ...updatedCards[index2], fold: true };
      updatedCards[index1] = card1;
      updatedCards[index2] = card2;
      setCards(updatedCards);
    }
  }

  return (
    <div>
      <header>
        <Countdown />
        <h1>Match 'em!</h1>
        <div>Score: {score}</div>
      </header>
      <div className="board-div">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              id={index}
              matchId={card.matchId}
              fold={card.fold}
              img={cardSuits[card.matchId]}
              onFlip={handleFlip}
            />
          );
        })}
      </div>
    </div>
  );
}
