import React, { useRef } from "react";
import { IoMdSettings } from "react-icons/io";
import style from "./style.module.css";

type Props = {
  size?: string;
  color?: string;
  hoverColor?: string;
  onClick?: () => void;
};

export default function SettingButton(props: Props) {
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
      onClick={props.onClick}
    >
      <IoMdSettings size="100%" />
    </button>
  );
}
