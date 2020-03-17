import React from "react";
import style from "./style.module.css";

type Props = {
  children: React.ReactNode;
};

export default function ScrollBox(props: Props) {
  return (
    <div className={style.box}>
      <div className={style.content_container}>{props.children}</div>
    </div>
  );
}
