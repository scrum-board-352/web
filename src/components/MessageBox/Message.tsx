import React from "react";
import { IoIosClose, IoMdInformation } from "react-icons/io";
import { MdCheck, MdClose } from "react-icons/md";
import className from "utils/class-name";
import { cutString } from "utils/string";
import style from "./message.module.css";

type Props = {
  type: "success" | "error" | "info";
  title: string;
  content?: string;
  onClose: () => void;
};

function typeIcon(type: Props["type"]) {
  switch (type) {
    case "error":
      return <MdClose size="70%" />;
    case "success":
      return <MdCheck size="70%" />;
    case "info":
      return <IoMdInformation size="100%" />;
    default:
      return <></>;
  }
}

function typeClass(type: Props["type"]) {
  switch (type) {
    case "success":
      return style.success;
    case "error":
      return style.error;
    case "info":
      return style.info;
    default:
      return "";
  }
}

export default function Message(props: Props) {
  return (
    <div className={className(style.message, typeClass(props.type), "shadow")}>
      <div className={style.icon_container}>{typeIcon(props.type)}</div>
      <div className={style.content_container}>
        <div className={style.header}>
          <p className={style.title}>{props.title}</p>
          <button className={style.close_btn} onClick={props.onClose}>
            <IoIosClose size="100%" />
          </button>
        </div>
        {props.content ? <p className={style.content}>{cutString(props.content, 50)}</p> : null}
      </div>
    </div>
  );
}
