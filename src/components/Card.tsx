import React from "react";
import { CardData } from "../model";
type Props = CardData & { id: number; onFlip: (matchId: number) => void };

export default class Card extends React.Component<Props> {
  render() {
    return (
      <div onClick={() => this.props.onFlip(this.props.id)} className="scene">
        <div className={`card ${!this.props.fold ? "flipped" : ""}`}>
          <div className="card_face front"></div>
          <div className="card_face back">
            <img src={this.props.img} />
          </div>
        </div>
      </div>
    );
  }
}
