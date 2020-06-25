import React from "react";
import { CardData } from "../model";
type Props = CardData & { onFlip: (matchId: number) => void };

export default class Card extends React.Component<Props> {
  state = {
    flipped: false,
  };

  render() {
    // const flip = () => {
    //   this.setState({ flipped: !this.state.flipped });
    // };

    return (
      <div
        onClick={() => this.props.onFlip(this.props.matchId)}
        className="scene"
      >
        <div className={`card ${this.state.flipped ? "flipped" : ""}`}>
          <div className="card_face front"></div>
          <div className="card_face back">
            <img src={this.props.img} />
          </div>
        </div>
      </div>
    );
  }
}
