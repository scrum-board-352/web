import React from "react";
import style from "./card-col.module.css";

type Props = {
  children: React.ReactNode;
};

export default function CardCol(props: Props) {
  return <div className={style.card_col}>{props.children}</div>;
}
