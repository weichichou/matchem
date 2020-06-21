import React from "react";
import { CardData } from "../model";
type Props = CardData;

export default class Card extends React.Component<Props> {
  render() {
    return <div>{this.props.id}</div>;
  }
}
