import React from "react";
import style from "./style.module.css";

type Props = {
  message?: string;
};

const noDataPlaceholderSvg = process.env.PUBLIC_URL + "/img/no_data.svg";

export default function Empty(props: Props) {
  return (
    <div className={style.empty}>
      <img src={noDataPlaceholderSvg} alt="" />
      <p>{props.message ?? "There is nothing here..."}</p>
    </div>
  );
}
