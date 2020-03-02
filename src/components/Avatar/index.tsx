import React from "react";

export enum NamePosition {
  Right = "right",
  Bottom = "bottom",
}

export type AvatarProps = {
  src: string;
  name: string;
  size: string;
  namePosition?: NamePosition;
  gap?: string;
  className?: string;
};

export default function Avatar(props: AvatarProps) {
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
        src={props.src}
        width={props.size}
        alt=""
        style={{ borderRadius: "50%" }}
      />
      <span style={nameStyle}>{props.name}</span>
    </div>
  );
}
