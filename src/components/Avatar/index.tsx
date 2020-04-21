import Img from "components/Img";
import React from "react";
import avatar from "utils/avatar";

export type Props = {
  name: string;
  avatar?: string;
  size: string;
  namePosition?: "right" | "bottom";
  gap?: string;
  className?: string;
};

export default function Avatar(props: Props) {
  const namePos = props.namePosition ?? "right";
  const gap = props.gap ?? "1rem";
  let containerClassName = "d-flex align-items-center";
  let nameStyle: React.CSSProperties = {};
  if (namePos === "right") {
    nameStyle.marginLeft = gap;
  }
  if (namePos === "bottom") {
    nameStyle.marginTop = gap;
    containerClassName += " flex-column";
  }

  return (
    <div className={`${containerClassName} ${props.className ?? ""}`}>
      <Img
        src={avatar(props.avatar)}
        style={{ borderRadius: "50%", width: props.size, height: props.size }}
      />
      <span style={nameStyle}>{props.name}</span>
    </div>
  );
}
