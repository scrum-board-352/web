import CardModel from "models/Card";
import React from "react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import style from "./priority.module.css";

type Props = {
  priority: CardModel.Info["priority"];
};

export default function Priority(props: Props) {
  let arrow: JSX.Element;
  let colorClass: string;
  switch (props.priority) {
    case "high":
      arrow = <IoMdArrowRoundUp />;
      colorClass = style.high;
      break;
    case "medium":
      arrow = <IoMdArrowRoundUp />;
      colorClass = style.medium;
      break;
    case "low":
      arrow = <IoMdArrowRoundDown />;
      colorClass = style.low;
      break;
    case "lowest":
      arrow = <IoMdArrowRoundDown />;
      colorClass = style.lowest;
      break;
    default:
      arrow = <></>;
      colorClass = "";
  }

  return (
    <span className={style.priority}>
      <span className={colorClass}>{arrow}</span>
      <span className={style.priority_text}>{props.priority ?? "None"}</span>
    </span>
  );
}
