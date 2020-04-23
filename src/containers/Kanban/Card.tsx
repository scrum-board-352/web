import Avatar from "components/Avatar";
import { message } from "components/MessageBox";
import { Template } from "components/ModalForm";
import SettingButton, { MenuItem } from "components/SettingButton";
import CardModel from "models/Card";
import React, { useContext, useState } from "react";
import className from "utils/class-name";
import { cutString } from "utils/string";
import style from "./card.module.css";
import { CardsContext } from "./CardsManager";
import KanbanFormContext from "./KanbanFormContext";
import Priority, { priorityColorClass, priorityOptionTemplate } from "./Priority";

type Props = {
  card: CardModel.Info;
  onClick?: () => void;
};

type UpdateCardFormValues = Pick<
  CardModel.UpdateInfo,
  "title" | "description" | "priority" | "processor" | "storyPoints"
>;

type SelectBoardFormValues = {
  boardId: string;
  status: string;
};

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

  const cardsManager = useContext(CardsContext);
  const getOpenModalForm = useContext(KanbanFormContext);
  const openUpdateCardForm = getOpenModalForm<UpdateCardFormValues>();
  const updateCardFormTemplate: Array<Template<UpdateCardFormValues>> = [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: props.card.title,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      defaultValue: props.card.description,
    },
    {
      name: "storyPoints",
      label: "Story Points",
      type: "number",
      defaultValue: props.card.storyPoints?.toString(),
      min: 1,
      required: true,
      filter: Number,
    },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: priorityOptionTemplate,
      required: true,
      defaultValue: props.card.priority,
    },
    {
      name: "processor",
      label: "Processor",
      type: "text",
      defaultValue: props.card.processor,
      filter: (processor) => processor.trim(),
    },
  ];

  function showUpdateCardForm() {
    openUpdateCardForm({
      title: "Update Card",
      templates: updateCardFormTemplate,
      onSubmit: async (values) => {
        const ok = await cardsManager.updateCard({
          id: props.card.id,
          ...values,
        });
        if (ok) {
          message.success("Update Succeed!");
        } else {
          message.error("Update Failed!");
        }
      },
    });
  }

  const openSelectBoardForm = getOpenModalForm<SelectBoardFormValues>();
  const boardIds = cardsManager.getBoardIds();
  const colNames = cardsManager.getColNames();
  const currentBoardId = cardsManager.getBoardId();

  function showMoveCardForm() {
    openSelectBoardForm({
      title: "Select Board",
      templates: [
        {
          label: "Which board to move to?",
          name: "boardId",
          type: "select",
          required: true,
          options: boardIds
            .map((id, i) => ({
              label: `iteration${i + 1}`,
              value: id,
            }))
            .filter((o) => o.value !== currentBoardId),
        },
        {
          label: "Which column?",
          name: "status",
          type: "select",
          required: true,
          options: colNames.map((col) => ({
            label: col,
            value: col,
          })),
          defaultValue: props.card.status,
        },
      ],
      async onSubmit(value) {
        const boardId = value.boardId;
        const status = value.status;
        if (!boardId || !status) {
          return;
        }
        await moveThisCardToBoard(boardId, status);
      },
    });
  }

  async function moveThisCardToBoard(boardId: string, colName: string) {
    message.info("Moving...");
    const res = await cardsManager.updateCard({
      id: props.card.id,
      boardId,
      status: colName,
    });
    if (res) {
      message.success("Move Succeed!");
    } else {
      message.error("Move Failed!");
    }
  }

  async function deleteThisCard() {
    message.info("Deleting...");
    const res = await cardsManager.deleteCard(props.card);
    if (res.success) {
      message.success("Delete Succeed!");
    } else {
      message.error("Delete Failed!");
    }
  }

  const cardSettingMenu: Array<MenuItem> = [
    {
      label: "Edit",
      onClick: showUpdateCardForm,
    },
    {
      label: "Move to",
      onClick: showMoveCardForm,
    },
    {
      label: "Delete",
      onClick: deleteThisCard,
    },
  ];

  return (
    <div
      data-card-id={props.card.id}
      className={className(style.card, movingClass, priorityColorClass(props.card.priority))}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={props.onClick}>
      <div className={style.header}>
        <p className={style.title_container}>
          <span className={style.title}>{cutString(props.card.title, 20)}</span>
          <span className={style.number}>No. {props.card.number}</span>
        </p>
        <SettingButton type="dot-h" size="1rem" menuItems={cardSettingMenu} />
      </div>
      <p className={style.description}>{cutString(props.card.description ?? "None", 50)}</p>
      <div className={style.footer}>
        <Avatar size="1rem" name={props.card.processor || "None"} gap="0.5rem" />
        <Priority priority={props.card.priority} />
      </div>
    </div>
  );
}
