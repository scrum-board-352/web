import ModalForm, { Template } from "components/ModalForm";
import CardModel from "models/Card";
import React, { Fragment, useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ScrollBox from "react-responsive-scrollbox";
import className from "utils/class-name";
import Card from "./Card";
import style from "./card-col.module.css";
import { CardsContext, createCard } from "./CardsManager";

type Props = {
  colName: string;
  onClickCard?: (cardId: string) => void;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  "onDrop" | "onDragOver" | "onDragEnter" | "onDragLeave"
>;

function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}

const createCardFormTemplate: Template<CardModel.CreateInfo>[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
  },
  {
    label: "Story Points",
    name: "storyPoints",
    type: "number",
  },
  {
    label: "Priority",
    name: "priority",
    type: "select",
    options: [
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
    ],
  },
  {
    label: "Processor",
    name: "processor",
    type: "text",
  },
];

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

  const dropClass = selected ? style.selected : droppable ? style.droppable : "";

  const [showCreateCard, setShowCreateCard] = useState(false);
  const [createCardLoading, setCreateCardLoading] = useState(false);

  async function submitCreateCard(values: CardModel.CreateInfo) {
    values.status = props.colName;
    console.log(values);
    await createCard(values);
  }

  function showCreateCardDialog() {
    setShowCreateCard(true);
  }

  return (
    <Fragment>
      <ModalForm<CardModel.CreateInfo>
        title="Create New Card"
        templates={createCardFormTemplate}
        show={showCreateCard}
        onClose={() => setShowCreateCard(false)}
        onSubmit={submitCreateCard}
        loading={createCardLoading}
      />
      <div
        className={style.card_col}
        data-col-name={props.colName}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <p className={style.title}>{props.colName}</p>
        <button className={style.add_card_btn} onClick={showCreateCardDialog}>
          <IoMdAdd />
          <span>New Card</span>
        </button>
        <ScrollBox className={className(style.cards_container, dropClass, "scrollbar_thumb_green")}>
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => props.onClickCard?.(card.id)} />
          ))}
        </ScrollBox>
      </div>
    </Fragment>
  );
}
