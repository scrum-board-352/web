import React, { useRef } from "react";
import { IoMdMore, IoMdSettings } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import style from "./style.module.css";

type Props = {
  size?: string;
  color?: string;
  hoverColor?: string;
  type?: "dot-v" | "dot-h" | "gear";
  onClick?: () => void;
};

function icon(type: Props["type"]) {
  switch (type) {
    case "dot-v":
      return <IoMdMore size="100%" />;
    case "dot-h":
      return <MdMoreHoriz size="100%" />;
    case "gear":
      return <IoMdSettings size="100%" />;
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
      onClick={props.onClick}>
      {icon(type)}
    </button>
  );
}
