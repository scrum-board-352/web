import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

type Props = {
  type: "404" | "401" | "403";
};

function warnTitle(type: Props["type"]) {
  switch (type) {
    case "401":
      return "Oops! Unauthorized";
    case "403":
      return "Oops! Permission Denied";
    case "404":
      return "Oops! Page Not Found";
    default:
      return "";
  }
}

function warnDetail(type: Props["type"]) {
  switch (type) {
    case "401":
      return "Sorry but you should login to see this page";
    case "403":
      return "Sorry but you don't have permission to access this page";
    case "404":
      return "Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable";
    default:
      return "";
  }
}

function redirectBtnText(type: Props["type"]) {
  switch (type) {
    case "401":
      return "LOGIN";
    case "403":
    case "404":
      return "BACK";
    default:
      return "";
  }
}

export default function ErrorPage(props: Props) {
  const history = useHistory();

  function redirect() {
    if (props.type === "401") {
      history.push("/login");
    } else {
      history.goBack();
    }
  }

  return (
    <div className={style.container}>
      <div className={style.notfound}>
        <div className={style.notfound_404}>
          <h1>
            <span className={style.title_text}>4</span>
            <span className={style.emoji}></span>
            <span className={style.title_text}>{props.type[2]}</span>
          </h1>
        </div>
        <h2>{warnTitle(props.type)}</h2>
        <p>{warnDetail(props.type)}</p>
        <button onClick={redirect}>{redirectBtnText(props.type)}</button>
      </div>
    </div>
  );
}
