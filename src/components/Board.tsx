import React from "react";
import { CardData } from "../model";
import Card from "./Card";
type Props = {};
type State = { cards: Record<number, CardData>; shuffledCards: Array<number> };

export default class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const cardNums = [];
    for (let i = 0; i < 8; i++) {
      cardNums.push(i, i);
    }

    this.state = {
      cards: {
        0: {
          matchId: 0,

          fold: true,
          img: "/constructocat2.jpg",
        },
        1: {
          matchId: 1,

          fold: true,
          img: "/waldocat.png",
        },
        2: {
          matchId: 2,
          fold: true,
          img: "/stormtroopocat.png",
        },
        3: {
          matchId: 3,
          fold: true,
          img: "/pusheencat.png",
        },
        4: {
          matchId: 4,
          fold: true,
          img: "/linktocat.jpg",
        },
        5: {
          matchId: 5,
          fold: true,
          img: "/plumber.jpg",
        },
        6: {
          matchId: 6,
          fold: true,
          img: "/original.png",
        },
        7: {
          matchId: 7,
          fold: true,
          img: "/spidertocat.png",
        },
      },

      shuffledCards: this.shuffle(cardNums),
    };
  }

  shuffle = (array: Array<number>) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  render() {
    return (
      <div className="board-div">
        {this.state.shuffledCards.map((id) => {
          let theCard = this.state.cards[id];
          return (
            <Card
              matchId={theCard.matchId}
              fold={theCard.fold}
              img={theCard.img}
            />
          );
        })}
      </div>
    );
  }
}
