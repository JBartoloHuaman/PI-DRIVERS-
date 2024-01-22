import { Link, NavLink } from "react-router-dom"
import style from "./card.module.css"

function Card({id,image,name,Teams}) {
    return (
      <div className={style["card-cont"]}>
        <NavLink className={style["card-button"]} to={`/detail/${id}`}>
        <h2 >Name: {name}</h2>
        <img className={style["card-img"]} src={image} alt={name} />
        </NavLink>
        <h3>Escuderías: {Teams}</h3>
      </div>
    )
  }
  export default Card