import React from "react";

export type Props = {
  name: string;
  avatar?: string;
  size: string;
  namePosition?: "right" | "bottom";
  gap?: string;
  className?: string;
};

const placeholderImg = process.env.PUBLIC_URL + "/img/user.svg";

function avatar(url: string | undefined) {
  return url ? url : placeholderImg;
}

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
      <img
        src={avatar(props.avatar)}
        alt=""
        style={{ borderRadius: "50%", width: props.size, height: props.size }}
      />
      <span style={nameStyle}>{props.name}</span>
    </div>
  );
}
