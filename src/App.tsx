import React from "react";
import "./App.css";
import Card from "./components/Card";
import Countdown from "./components/Countdown";
import cardSuits from "./components/cardSuits";

type Props = {};
type State = {
  cards: Array<{ matchId: number; fold: boolean; outOfGame: boolean }>;
  score: number;
};

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initialCards = [];
    for (let i = 0; i < 8; i++) {
      initialCards.push(
        { matchId: i, fold: true, outOfGame: false },
        { matchId: i, fold: true, outOfGame: false }
      );
    }

    this.state = {
      cards: this.shuffle(initialCards),
      score: 0,
    };
  }

  shuffle = (
    array: Array<{ matchId: number; fold: boolean; outOfGame: boolean }>
  ) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  handleFlip = (id: number) => {
    let cards = [...this.state.cards];
    let card = { ...cards[id], fold: false };
    cards[id] = card;
    this.setState({ cards });

    if (
      cards.filter((card) => !card.outOfGame).filter((card) => !card.fold)
        .length === 2
    ) {
      let indexes: number[] = [];
      for (let i = 0; i < cards.length; i++) {
        if (!cards[i].fold && !cards[i].outOfGame) {
          indexes.push(i);
        }
      }
      setTimeout(() => {
        this.handleCheck(indexes[0], indexes[1]);
        indexes = [];
      }, 1000);
    }
  };

  handleCheck = (index1: number, index2: number) => {
    console.log("checking?");
    if (this.state.cards[index1].matchId === this.state.cards[index2].matchId) {
      console.log("match!");
      this.setState({ score: this.state.score + 1 });
      let cards = [...this.state.cards];
      let card1 = { ...cards[index1], outOfGame: true };
      let card2 = { ...cards[index2], outOfGame: true };
      cards[index1] = card1;
      cards[index2] = card2;
      this.setState({ cards });
    } else {
      console.log("not match!!");
      let cards = [...this.state.cards];
      let card1 = { ...cards[index1], fold: true };
      let card2 = { ...cards[index2], fold: true };
      cards[index1] = card1;
      cards[index2] = card2;
      this.setState({ cards });
    }
  };

  render() {
    //console.log("cards", this.state.cards);
    return (
      <div>
        <header>
          <Countdown />
          <h1>Match 'em!</h1>
          <div>Score: {this.state.score}</div>
        </header>
        <div className="board-div">
          {this.state.cards.map((card, index) => {
            return (
              <Card
                id={index}
                matchId={card.matchId}
                fold={card.fold}
                img={cardSuits[card.matchId]}
                onFlip={this.handleFlip}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
