import React from "react";
import { CardData } from "../model";
type Props = CardData;

export default class Card extends React.Component<Props> {
  state = {
    flipped: false,
  };
  render() {
    return (
      <div
        onClick={() => this.setState({ flipped: !this.state.flipped })}
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
