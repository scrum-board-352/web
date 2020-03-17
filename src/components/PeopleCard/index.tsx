import Avatar from "components/Avatar";
import UserModel from "models/User";
import React from "react";

type Props = {
  user: UserModel.PublicInfo;
  size: string;
  className?: string;
  onClick?: () => void;
};

export default function PeopleCard(props: Props) {
  const className = props.className ?? "";

  return (
    <div
      className={`${className} cardshadow d-flex align-items-center justify-centent-center p-4 rounded-lg`}
      style={{ cursor: "pointer" }}
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
