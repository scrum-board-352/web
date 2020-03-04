import UserModel from "models/User";
import React from "react";

export enum NamePosition {
  Right = "right",
  Bottom = "bottom",
}

export type Props = {
  user: UserModel.PublicInfo;
  size: string;
  namePosition?: NamePosition;
  gap?: string;
  className?: string;
};

export default function Avatar(props: Props) {
  const namePos = props.namePosition ?? NamePosition.Right;
  const gap = props.gap ?? "1rem";
  let containerClassName = "d-flex align-items-center";
  let nameStyle: React.CSSProperties = {};
  if (namePos === NamePosition.Right) {
    nameStyle.marginLeft = gap;
  }
  if (namePos === NamePosition.Bottom) {
    nameStyle.marginTop = gap;
    containerClassName += " flex-column";
  }

  return (
    <div className={`${containerClassName} ${props.className ?? ""}`}>
      <img
        src={props.user.avatar}
        alt=""
        style={{ borderRadius: "50%", width: props.size, height: props.size }}
      />
      <span style={nameStyle}>{props.user.name}</span>
    </div>
  );
}
