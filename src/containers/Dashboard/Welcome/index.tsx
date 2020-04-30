import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import className from "utils/class-name";
import style from "./style.module.css";

export default function Welcome() {
  const history = useHistory();

  function goToProjects() {
    history.push("/dashboard/projects");
  }

  return (
    <div className={style.welcome}>
      <h1 className="animated bounceInDown">Let's Start!</h1>
      <div className={className(style.bg_start, "animated", "bounceInRight")}></div>
      <Button onClick={goToProjects} className="animated bounceInUp">
        View Projects
      </Button>
    </div>
  );
}
