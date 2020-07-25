import React from "react";
import "./App.css";
import Card from "./components/Card";
import Countdown from "./components/Countdown";
import cardSuits from "./components/cardSuits";

type Props = {};
type State = {
  shuffledCards: Array<{ matchId: number; fold: boolean; outOfGame: boolean }>;
  score: number;
};

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const cardNums = [];
    for (let i = 0; i < 8; i++) {
      cardNums.push(
        { matchId: i, fold: true, outOfGame: false },
        { matchId: i, fold: true, outOfGame: false }
      );
    }

    this.state = {
      shuffledCards: this.shuffle(cardNums),
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
    let shuffledCards = [...this.state.shuffledCards];
    let card = { ...shuffledCards[id], fold: false };
    shuffledCards[id] = card;
    this.setState({ shuffledCards });

    if (
      shuffledCards
        .filter((card) => !card.outOfGame)
        .filter((card) => !card.fold).length === 2
    ) {
      let indexes: number[] = [];
      for (let i = 0; i < shuffledCards.length; i++) {
        if (!shuffledCards[i].fold && !shuffledCards[i].outOfGame) {
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
    if (
      this.state.shuffledCards[index1].matchId ===
      this.state.shuffledCards[index2].matchId
    ) {
      console.log("match!");
      this.setState({ score: this.state.score + 1 });
      let shuffledCards = [...this.state.shuffledCards];
      let card1 = { ...shuffledCards[index1], outOfGame: true };
      let card2 = { ...shuffledCards[index2], outOfGame: true };
      shuffledCards[index1] = card1;
      shuffledCards[index2] = card2;
      this.setState({ shuffledCards });
    } else {
      console.log("not match!!");
      let shuffledCards = [...this.state.shuffledCards];
      let card1 = { ...shuffledCards[index1], fold: true };
      let card2 = { ...shuffledCards[index2], fold: true };
      shuffledCards[index1] = card1;
      shuffledCards[index2] = card2;
      this.setState({ shuffledCards });
    }
  };

  render() {
    //console.log("shuffledCards", this.state.shuffledCards);
    return (
      <div>
        <header>
          <Countdown />
          <h1>Match 'em!</h1>
          <div>Score: {this.state.score}</div>
        </header>
        <div className="board-div">
          {this.state.shuffledCards.map((card, index) => {
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
