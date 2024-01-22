import { Link } from "react-router-dom";
import style from "./landingpage.module.css";

export default function LandingPage() {
  return (
    <div className={style['landing-cont']}>
      <div className={style['title-cont']}>
        <h1 className={style['title']}>WELCOME</h1>
        <Link to="/home">
          <button className={style["button-landing"]}>Entrar
          <span></span>
          <span></span>
          <span></span>
          </button>
        </Link>
      </div>
    </div>
  );
}
