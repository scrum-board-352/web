import React from "react";
import Avatar, { NamePosition } from "components/Avatar";

type Props = {
  avatarSrc: string;
  size: string;
  name: string;
  className?: string;
  onClick?: () => void;
};

export default function PeopleCard(props: Props) {
  const className = props.className ?? "";

  return (
    <div
      className={`${className} cardshadow d-flex align-items-center justify-centent-center p-4`}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    >
      <Avatar
        size={props.size}
        src={props.avatarSrc}
        name={props.name}
        namePosition={NamePosition.Bottom}
      />
    </div>
  );
}
