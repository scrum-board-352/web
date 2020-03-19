import Avatar from "components/Avatar";
import UserModel from "models/User";
import React from "react";
import className from "utils/class-name";
import style from "./style.module.css";

type Props = {
  user: UserModel.PublicInfo;
  size: string;
  className?: string;
  onClick?: () => void;
};

export default function PeopleCard(props: Props) {
  return (
    <div
      className={className(
        style.card,
        props.className,
        "cardshadow",
        "d-flex",
        "align-items-center",
        "justify-centent-center",
        "p-4",
        "rounded-lg"
      )}
      onClick={props.onClick}
    >
      <Avatar
        size={props.size}
        name={props.user.name}
        avatar={props.user.avatar}
        namePosition="bottom"
      />
    </div>
  );
}
