import ScrollBox from "components/ScrollBox";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import className from "utils/class-name";
import Card from "./Card";
import style from "./card-col.module.css";
import { CardsContext } from "./CardsManager";

type Props = {
  colName: string;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  "onDrop" | "onDragOver" | "onDragEnter" | "onDragLeave"
>;

function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}

export default function CardCol(props: Props) {
  let droppable = false;
  let selected = false;
  const cardsManager = useContext(CardsContext);
  const cards = cardsManager.getCardsByColName(props.colName);

  if (cardsManager.isDragging()) {
    if (cardsManager.getOriginColName() !== props.colName) {
      droppable = true;
      if (cardsManager.getSelectedColName() === props.colName) {
        selected = true;
      }
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    const cardId = (e.target as HTMLDivElement).dataset["cardId"];
    if (!cardId) {
      throw Error("card should have data-card-id attribute!");
    }
    cardsManager.startDrag(cardId, props.colName);
  }

  function handleDragEnd() {
    cardsManager.endDrag();
  }

  function handleDrop() {
    cardsManager.setTargetColName(props.colName);
  }

  function handleDragEnter() {
    if (cardsManager.getOriginColName() !== props.colName) {
      cardsManager.setSelectedColName(props.colName);
    }
  }

  function handleDragLeave() {
    if (cardsManager.getOriginColName() !== props.colName) {
      cardsManager.setSelectedColName("");
    }
  }

  const dropClass = selected
    ? style.selected
    : droppable
    ? style.droppable
    : "";

  return (
    <div
      className={style.card_col}
      data-col-name={props.colName}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p className={style.title}>{props.colName}</p>
      <button className={style.add_card_btn}>
        <IoMdAdd />
        <span>New Card</span>
      </button>
      <ScrollBox
        type="vertical"
        className={className(style.cards_container, dropClass)}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </ScrollBox>
    </div>
  );
}
