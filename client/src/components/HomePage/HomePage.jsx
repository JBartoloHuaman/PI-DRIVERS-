import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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

const HomePage = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const teams = useSelector((state) => state.teams);

  const currentPage = useSelector((state) => state.currentPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      await dispatch(getDrivers());
      await dispatch(getTeams());
      setLoading(false);
    };

    data();
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
    <div className=" border-x-[20px] border-[#870000] lg:border-x-[60px]">
      <div className="max-w-7xl mx-auto sm:gap-3 flex flex-col items-center">
        <h3 className=" text-lg font-semibold">Page: {currentPage + 1}</h3>
        <div className=" py-4 w-full justify-center flex flex-row ">
          <button
            className="sm:hover:bg-white sm:hover:text-red-700 active:bg-red-950 mr-1 bg-red-700 rounded-md pl-1 pr-1 font-bold "
            onClick={pagination}
            name="prev"
          >
            {"<<"}
          </button>
          <div className="flex flex-col gap-1 sm:flex-row">
            <button
              className="sm:h-auto sm:hover:bg-red-700 sm:hover:text-white active:bg-red-300 font-bold text-red-700 bg-white rounded-md h-[50%]"
              onClick={handleRefresh}
            >
              Refresh
            </button>

            <select
              className="text-black"
              name="filter-origin"
              onChange={filter}
              id="select-1"
            >
              <option value="all-drivers">All Drivers</option>
              <option value="created">Created</option>
              <option value="api">API</option>
            </select>

            <select
              className="text-black"
              name="filter-teams"
              onChange={filter}
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
              className="text-black"
              name="filter-order"
              onChange={filter}
              id="select-3"
            >
              <option value="------">------</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <button
            className="sm:hover:bg-white sm:hover:text-red-700 active:bg-red-950 ml-1 bg-red-700 rounded-md pl-1 pr-1 font-bold"
            onClick={pagination}
            name="next"
          >
            {">>"}
          </button>
        </div>
        {loading ? (
          <div className="mt-20 text-3xl font-mono font-semibold text-blue-300">
            <h1>Loading...</h1>
          </div>
        ) : (
          <Cards drivers={drivers} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
