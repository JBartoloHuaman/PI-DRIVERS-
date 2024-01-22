import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getDrivers,
  getTeams,
  changePage,
  filterTeam,
  refresh,
  filterOrder,
  filterOrigin,
} from "../../redux/actions/actions";
import Cards from "../Cards/Cards";
import style from "./homepage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const teams = useSelector((state) => state.teams);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, []);

  const pagination = (event) => {
    dispatch(changePage(event.target.name));
  };

  const filter = (event) => {
    console.log(event.target.value);
    if (event.target.name === "filter-teams")
      dispatch(filterTeam(event.target.value));
    if (event.target.name === "filter-order")
      dispatch(filterOrder(event.target.value));
    if (event.target.name === "filter-origin")
      dispatch(filterOrigin(event.target.value));
  };

  const handleRefresh = () => {
    dispatch(refresh());
    document.getElementById("select-1").value = "all-drivers";
    document.getElementById("select-2").value = "------";
    document.getElementById("select-3").value = "------";
  };

  return (
    <div className={style["page-container"]}>
      <div className={style["home-filter"]}>
        <div className={style["page-number"]}>
          <h3>Page: {currentPage + 1}</h3>
        </div>
        <div className={style["filters"]}>
          <button
            onClick={pagination}
            name="prev"
            className={`${style["select"]} ${style["prevandnext"]}`}
          >
            {"<<"}
          </button>
          <div className={style["filters-f"]}>
            <button
              onClick={handleRefresh}
              className={`${style["select"]} ${style["refresh"]}`}
            >
              Refresh
            </button>

            <select
              name="filter-origin"
              onChange={filter}
              className={`${style["select"]} ${style["filter-origin"]}`}
              id="select-1"
            >
              <option value="all-drivers">All Drivers</option>
              <option value="created">Created</option>
              <option value="api">API</option>
            </select>

            <select
              name="filter-teams"
              onChange={filter}
              className={`${style["select"]} ${style["filter-teams"]}`}
              id="select-2"
            >
              <option value="------">------</option>
              {teams?.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <select
              name="filter-order"
              onChange={filter}
              className={`${style["select"]} ${style["filter-order"]}`}
              id="select-3"
            >
              <option value="------">------</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <button
            onClick={pagination}
            name="next"
            className={`${style["select"]} ${style["prevandnext"]}`}
          >
            {">>"}
          </button>
        </div>
      </div>
      <Cards drivers={drivers} />
    </div>
  );
};

export default HomePage;
