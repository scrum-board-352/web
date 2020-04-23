import { Template } from "components/ModalForm";
import CardModel from "models/Card";
import UserModel from "models/User";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import ScrollBox from "react-responsive-scrollbox";
import { useStore } from "rlax";
import className from "utils/class-name";
import Card from "./Card";
import style from "./card-col.module.css";
import { CardsContext } from "./CardsManager";
import KanbanFormContext from "./KanbanFormContext";
import { priorityOptionTemplate } from "./Priority";

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
    required: true,
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
    required: true,
    min: 1,
  },
  {
    label: "Priority",
    name: "priority",
    type: "select",
    options: priorityOptionTemplate,
    required: true,
  },
  {
    label: "Processor",
    name: "processor",
    type: "text",
    filter: (processor: string) => processor.trim(),
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

  const currentUser: UserModel.PrivateInfo = useStore("user");
  const boardId = cardsManager.getCurrentBoardId();

  async function handleSubmitCreateCard(values: CardModel.CreateInfo) {
    values.status = props.colName;
    values.founder = currentUser.name;
    values.boardId = boardId;
    await cardsManager.createCard(values);
  }

  const getOpenModalForm = useContext(KanbanFormContext);
  const openModalForm = getOpenModalForm<CardModel.CreateInfo>();

  function showCreateCardForm() {
    openModalForm({
      title: "Create New Card",
      templates: createCardFormTemplate,
      onSubmit: handleSubmitCreateCard,
    });
  }

  return (
    <div
      className={style.card_col}
      data-col-name={props.colName}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <p className={style.title}>
        {props.colName} <span className={style.cards_count}>{cards.length}</span>
      </p>
      <button className={style.add_card_btn} onClick={showCreateCardForm}>
        <IoMdAdd />
        <span>New Card</span>
      </button>
      <ScrollBox className={className(style.cards_container, dropClass, "scrollbar_thumb_green")}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => props.onClickCard?.(card.id)} />
        ))}
      </ScrollBox>
    </div>
  );
}
