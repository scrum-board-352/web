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
import Priority, { priorityOptionTemplate } from "./Priority";

type Props = {
  card: CardModel.Info;
  onClick?: () => void;
};

type UpdateCardFormValues = Pick<
  CardModel.UpdateInfo,
  "title" | "description" | "priority" | "processor" | "storyPoints"
>;

function colorClass(priority: CardModel.Info["priority"]) {
  return priority ? style[priority] : "";
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

  const cardsManager = useContext(CardsContext);
  const getOpenModalForm = useContext(KanbanFormContext);
  const openModalForm = getOpenModalForm<UpdateCardFormValues>();
  const updateCardFormTemplate: Array<Template<UpdateCardFormValues>> = [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: props.card.title,
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
    },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: priorityOptionTemplate,
      defaultValue: props.card.priority,
    },
    {
      name: "processor",
      label: "Processor",
      type: "text",
      defaultValue: props.card.processor,
    },
  ];

  function showUpdateCardForm() {
    openModalForm({
      title: "Update Card",
      templates: updateCardFormTemplate,
      onSubmit: async (values) => {
        const ok = await cardsManager.updateCard({
          id: props.card.id,
          ...values,
        });
        if (ok) {
          message({
            title: "Update Succeed!",
            type: "success",
          });
        } else {
          message({
            title: "Update Failed!",
            type: "error",
          });
        }
      },
    });
  }

  async function deleteThisCard() {
    message({
      title: "Deleting...",
      type: "info",
    });
    const res = await cardsManager.deleteCard(props.card);
    if (res.success) {
      message({
        title: "Delete Succeed!",
        type: "success",
      });
    } else {
      message({
        title: "Delete Failed!",
        type: "error",
      });
    }
  }

  const cardSettingMenu: Array<MenuItem> = [
    {
      label: "Edit",
      onClick: showUpdateCardForm,
    },
    {
      label: "Delete",
      onClick: deleteThisCard,
    },
  ];

  return (
    <div
      data-card-id={props.card.id}
      className={className(style.card, movingClass, colorClass(props.card.priority))}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={props.onClick}>
      <div className={style.header}>
        <p className={style.title}>{cutString(props.card.title, 20)}</p>
        <SettingButton type="dot-h" size="1rem" menuItems={cardSettingMenu} />
      </div>
      <p className={style.description}>{cutString(props.card.description ?? "None", 50)}</p>
      <div className={style.footer}>
        <Avatar size="1rem" name={props.card.processor ?? "None"} gap="0.5rem" />
        <Priority priority={props.card.priority} />
      </div>
    </div>
  );
}
