import Avatar from "components/Avatar";
import SettingButton from "components/SettingButton";
import CardModel from "models/Card";
import React, { useState } from "react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import className from "utils/class-name";
import style from "./card.module.css";

type Props = {
  card: CardModel.Info;
};

type PriorityProps = {
  priority: CardModel.Info["priority"];
};

function Priority(props: PriorityProps) {
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
      <span className={style.priority_test}>{props.priority}</span>
    </span>
  );
}

export default function Card(props: Props) {
  const [moving, setMoving] = useState(false);

  function handleDragStart() {
    // change style AFTER drag start.
    setTimeout(setMoving, 0, true);
  }

  function handleDragEnd() {
    setMoving(false);
  }

  const movingClass = moving ? style.moving : "";

  return (
    <div
      data-card-id={props.card.id}
      className={className(style.card, movingClass)}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={style.header}>
        <p className={style.title}>{props.card.title}</p>
        <SettingButton type="dot-h" size="1rem" />
      </div>
      <p className={style.description}>{props.card.description}</p>
      <div className={style.footer}>
        <Avatar
          size="1rem"
          name={props.card.processor ?? "None"}
          gap="0.5rem"
        />
        <Priority priority={props.card.priority} />
      </div>
    </div>
  );
}
