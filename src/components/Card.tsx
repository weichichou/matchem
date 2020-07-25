import React from "react";
import { CardData } from "../model";

type Props = CardData & {
  id: number;
  fold: boolean;
  onFlip: (matchId: number) => void;
};

export default function Card(props: Props) {
  return (
    <div onClick={() => props.onFlip(props.id)} className="scene">
      <div className={`card ${!props.fold ? "flipped" : ""}`}>
        <div className="card_face front"></div>
        <div className="card_face back">
          <img src={props.img} alt="cardsuit" />
        </div>
      </div>
    </div>
  );
}
