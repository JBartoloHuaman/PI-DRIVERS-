import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchDriver, refresh } from "../../redux/actions/actions";
import logo from "../../assets/logo.svg";

export default function Nav() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleButton = (event) => {
    event.preventDefault();
    dispatch(SearchDriver(input));
    document.getElementById("search").value = "";
  };

  const Refresh = () => {
    dispatch(refresh());
  };

  return (
    <div className=" bg-cyan-950 text-white">

    <ul className="font-semibold sm:py-0 sm:mx-auto sm:max-w-7xl  sm:gap-3 text-lg sm:h-14  py-2 gap-2 flex-col sm:flex-row flex items-center">
      <li className="h-full hover:bg-cyan-900 flex items-center">
        <Link to="/">
          <img className=" w-20 sm:w-16" src={logo} alt="logo" />
        </Link>
      </li>
      <li className="hover:text-red-600 flex items-center hover:bg-cyan-900 h-full ">
        <Link onClick={Refresh} to="/home">
          Home
        </Link>
      </li>
      <li className="sm:min-w-[125px] flex items-center hover:bg-cyan-900 hover:text-red-600 h-full">
        <Link to="/form">Register Driver</Link>
      </li>
      <li className="sm:flex sm:w-[60%] sm:items-center sm:justify-end">
          <form autoComplete="off" className="m-0">
          <input
            onChange={handleInput}
            type="text"
            id="search"
            placeholder="Buscar..."
            className="sm:h-6 text-black h-7 rounded-s-lg"
          />
          <button className=" hover:bg-red-600 cursor-pointer h-7 bg-gray-900 w-16" onClick={handleButton}>
            Buscar
          </button>
          </form>
        
      </li>
    </ul>
    </div>
  );
}
