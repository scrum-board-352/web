import React, { useRef } from "react";
import { IoMdMore, IoMdSettings } from "react-icons/io";
import { MdKeyboardArrowDown, MdMoreHoriz } from "react-icons/md";
import { MenuItem as _MenuItems, showMenuClickHandler } from "./dom";
import style from "./style.module.css";

export type MenuItem = _MenuItems;

type Props = {
  size?: string;
  color?: string;
  hoverColor?: string;
  type?: "dot-v" | "dot-h" | "gear" | "down-arrow";
  menuItems?: Array<MenuItem>;
};

function icon(type: Props["type"]) {
  switch (type) {
    case "dot-v":
      return <IoMdMore size="100%" />;
    case "dot-h":
      return <MdMoreHoriz size="100%" />;
    case "gear":
      return <IoMdSettings size="100%" />;
    case "down-arrow":
      return <MdKeyboardArrowDown size="100%" />;
    default:
      return <></>;
  }
}

export default function SettingButton(props: Props) {
  const type = props.type ?? "gear";
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={btnRef}
      onMouseEnter={() => {
        const btn = btnRef.current;
        if (btn !== null) {
          btn.style.color = props.hoverColor ?? "";
        }
      }}
      onMouseLeave={() => {
        const btn = btnRef.current;
        if (btn !== null) {
          btn.style.color = props.color ?? "";
        }
      }}
      className={style.setting_btn}
      style={{
        color: props.color ?? "",
        width: props.size ?? "",
        height: props.size ?? "",
      }}
      onClick={(e) => showMenuClickHandler(e, props.menuItems)}>
      {icon(type)}
    </button>
  );
}
