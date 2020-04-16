import CardModel from "models/Card";
import React from "react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import style from "./priority.module.css";

type Props = {
  priority: CardModel.Info["priority"];
};

export const priorityOptionTemplate = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Lowest",
    value: "lowest",
  },
];

export default function Priority(props: Props) {
  let arrow: JSX.Element;
  switch (props.priority) {
    case "high":
      arrow = <IoMdArrowRoundUp />;
      break;
    case "medium":
      arrow = <IoMdArrowRoundUp />;
      break;
    case "low":
      arrow = <IoMdArrowRoundDown />;
      break;
    case "lowest":
      arrow = <IoMdArrowRoundDown />;
      break;
    default:
      arrow = <></>;
  }

  return (
    <span className={style.priority}>
      <span className={style.arrow}>{arrow}</span>
      <span className={style.priority_text}>{props.priority ?? "None"}</span>
    </span>
  );
}
