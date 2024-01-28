import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDriverDetail, getDriverById } from "../../redux/actions/actions";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driverDetail = useSelector((state) => state.driverDetail);

  useEffect(() => {
    dispatch(getDriverById(id));
    return () => dispatch(cleanDriverDetail());
  }, [id]);

  return (
    <div className="sm:mt-10 sm:justify-around sm:max-w-7xl sm:flex max-w-[90%] mx-auto font-mono">
      <div className="flex justify-center my-5 sm:my-auto">
        <img
          className=" border-red-600 border-4 rounded-md object-cover h-[360px] sm:h-[480px]"
          src={driverDetail?.image}
          alt={driverDetail?.name}
        />
      </div>
      <div className="sm:w-[50%] ">
        <h2>
          <span className="sm:text-xl text-red-600 font-semibold text-lg">
            Name:
          </span>
          <span className="sm:text-lg">{driverDetail?.name}</span>
        </h2>
        <h3>
          <span className=" sm:text-xl text-red-600 font-semibold text-lg">
            Lastname:
          </span>{" "}
          <span className="sm:text-lg">{driverDetail?.lastname}</span>
        </h3>
        <h3>
          <span className=" sm:text-xl text-red-600 font-semibold text-lg">
            Nationality:
          </span>{" "}
          <span className="sm:text-lg">{driverDetail?.nacionality}</span>
        </h3>
        <h3>
          <span className=" sm:text-xl text-red-600 font-semibold text-lg">
            Birhdate:
          </span>{" "}
          <span className="sm:text-lg">

          {driverDetail?.birthdate}
          </span>
        </h3>
        <h3>
          <span className=" sm:text-xl text-red-600 font-semibold text-lg">
            Teams:
          </span>{" "}
          <span className="sm:text-lg">

          {driverDetail?.Teams?.join(", ")}
          </span>
        </h3>
        <h3>
          <span className="sm:text-xl text-red-600 font-semibold text-lg">
            Description:
          </span>
          <div className="sm:text-lg h-[200px] overflow-scroll">
            {driverDetail?.description}
          </div>
        </h3>
      </div>
    </div>
  );
}

export default Details;
