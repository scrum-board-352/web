import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./style.module.css";

function Home() {
  return (
    <div className={style.landing}>
      <div className={style.bg_circle}></div>
      <div className={style.bg_illustration}></div>
      <div className={style.bg_square}></div>
      <nav>
        <Container className="h-100 d-flex align-items-center">
          <Link to="/" className={style.logo}></Link>
          <Link to="/" className={style.nav_link}>
            HOME
          </Link>
          <Link to="/dashboard" className={style.nav_link}>
            DASHBOARD
          </Link>
        </Container>
      </nav>
      <Container className="h-100 d-flex align-items-center">
        <div className={style.content}>
          <h1 className="animated bounceInUp">Manage Your Tasks.</h1>
          <p className="animated bounceInUp">
            Use kanban to organize and prioritize your projects in an efficient way.
          </p>
          <button className="animated bounceInUp">Get Started</button>
        </div>
      </Container>
    </div>
  );
}

export default Home;
