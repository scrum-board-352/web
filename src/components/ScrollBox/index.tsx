import React from "react";
import className from "utils/class-name";
import style from "./style.module.css";

type Props = {
  type?: "vertical" | "horizontal";
  className?: string;
  children: React.ReactNode;
};

function typeClass(type: Props["type"]) {
  switch (type) {
    case "horizontal":
      return style.horizontal;
    case "vertical":
      return style.vertical;
    default:
      return "";
  }
}

export default function ScrollBox(props: Props) {
  const type = props.type ?? "horizontal";
  return (
    <div className={style.box}>
      <div
        className={className(
          style.content_container,
          typeClass(type),
          props.className
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
