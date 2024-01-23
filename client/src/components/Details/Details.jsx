import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDriverDetail, getDriverById } from "../../redux/actions/actions";
import style from "./details.module.css";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driverDetail = useSelector((state) => state.driverDetail);

  useEffect(() => {
    dispatch(getDriverById(id));
    return () => dispatch(cleanDriverDetail());
  }, [id]);

  return (
    <div className={style["detail-cont-"]}>
      <div className={style['detail-cont']}>
        <div className={style["detail-driver"]}>
          <h2>
            <span className={style["text-red"]}>Name:</span>{" "}
            {driverDetail?.name}
          </h2>
          <h3>
            <span className={style["text-red"]}>Lastname</span>{" "}
            {driverDetail?.lastname}
          </h3>
          <h3>
            <span className={style["text-red"]}>Nationality:</span>{" "}
            {driverDetail?.nacionality}
          </h3>
          <h3>
            <span className={style["text-red"]}>Birhdate:</span>{" "}
            {driverDetail?.birthdate}
          </h3>
          <h3>
            <span className={style["text-red"]}>Teams:</span>{" "}
            {driverDetail?.Teams?.join(", ")}
          </h3>
          <h3>
            <span className={style["text-red"]}>Description:</span>
            <div className={style["text-description"]}>
              {driverDetail?.description}
            </div>
          </h3>
        </div>
        <div>
          <img
            className={style["detail-img"]}
            src={driverDetail?.image}
            alt={driverDetail?.name}
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
