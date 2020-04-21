import React from "react";
import className from "utils/class-name";
import style from "./style.module.css";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function Img(props: Props) {
  return (
    <div className={className(style.container, props.className)} style={props.style}>
      <img src={props.src} alt="" />
    </div>
  );
}
