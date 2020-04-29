import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./style.module.css";

function Home() {
  return (
    <div className={style.landing}>
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
        <p className={style.content}>
          <h1>Manage Your Tasks.</h1>
          <p>Use kanban to organize and prioritize your projects in an efficient way.</p>
          <button>Get Started</button>
        </p>
      </Container>
    </div>
  );
}

export default Home;
