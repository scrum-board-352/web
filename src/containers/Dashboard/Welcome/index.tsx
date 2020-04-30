import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

export default function Welcome() {
  const history = useHistory();

  function goToProjects() {
    history.push("/dashboard/projects");
  }

  return (
    <div className={style.welcome}>
      <h1>Let's Start!</h1>
      <div className={style.bg_start}></div>
      <Button onClick={goToProjects}>View Projects</Button>
    </div>
  );
}
