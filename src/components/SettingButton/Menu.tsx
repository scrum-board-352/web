import React from "react";
import className from "utils/class-name";
import style from "./menu.module.css";

export interface MenuItem {
  label: string;
  onClick?: () => void;
}

type Props = {
  items?: Array<MenuItem>;
};

export default function Menu(props: Props) {
  return (
    <div className={className(style.menu, "animated", "fadeIn", "shadow")}>
      {props.items?.map((item) => (
        <button key={item.label} className={style.item} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
