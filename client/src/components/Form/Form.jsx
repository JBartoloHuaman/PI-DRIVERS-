import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, getTeams } from "../../redux/actions/actions";
import validation from "../../validation";
import Card from "../Card/Card";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const drivers = useSelector((state) => state.drivers);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    nacionality: "",
    birthdate: "",
    Teams: [],
    image:
      "https://img.freepik.com/vector-premium/coche-corredor-dibujos-animados_74102-1526.jpg",
    description: "",
  });

  const [cont, setCont] = useState(1);
  const [team, setTeam] = useState([]);
  const [inputTeam, setInputTeam] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    if (event.target.name === "teams") {
      if (event.target.value !== "------") {
        setTeam([...team, event.target.value]);
        setForm((prev) => {
          return {
            ...prev,
            Teams: [...prev.Teams, event.target.value],
          };
        });
      }
    }
    if (event.target.name !== "teams") {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
    setErrors(
      validation({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  const addTeam = (event) => {
    event.preventDefault();
    setInputTeam([
      ...inputTeam,
      <div key={cont}>
        <label htmlFor="teams">Teams:</label>
        <select
          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
          onChange={handleInput}
          name="teams"
          id="teams"
        >
          <option value="------">------</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>,
    ]);
    setCont(cont + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("teams").value = "------";
    const driversRepeat = drivers.find(
      (driver) =>
        driver.name.toLowerCase() === form.name.toLowerCase() &&
        driver.lastname.toLowerCase() === form.lastname.toLowerCase()
    );
    for (const key in form) {
      if (form[key] === "") return alert("Faltan completar algunos datos");
    }
    // if(Object.keys(errors).length) return alert("Faltan completar algunos datos")
    if (driversRepeat) return alert("The driver is already registered");
    dispatch(createDriver(form));
    alert("driver is created");
    setInputTeam([]);
    setForm({
      name: "",
      lastname: "",
      nacionality: "",
      birthdate: "",
      Teams: [],
      image: "",
      description: "",
    });
    navigate("/home");
  };

  return (
    <div className="sm:justify-evenly sm:flex-row sm:max-w-7xl flex max-w-[90%] flex-col mx-auto">
      <form className="sm:w-[50%] flex flex-col" onSubmit={handleSubmit}>
        <h2 className="text-cyan-400 mt-2 text-center text-[18px] font-semibold leading-7">
          Creating Drive
        </h2>

        <fieldset className="bg-cyan-950 px-4 border rounded-md pb-4 mt-2 ">
          <legend>
            <h3 className="sm:text-lg text-[red] text-base sm:font-bold font-semibold leading-7">
              Driver Information
            </h3>
          </legend>
          <div>
            <label className="block text-sm font-medium leading-6">Name:</label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                onChange={handleInput}
                value={form.name}
                type="text"
                name="name"
                placeholder="Write..."
              />
            </div>
            <div className=" text-red-400 font-mono text-sm">{errors.name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">
              Lastname:
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                onChange={handleInput}
                value={form.lastname}
                type="text"
                name="lastname"
                placeholder="Write..."
              />
            </div>
            <div className=" text-red-400 font-mono text-sm">
              {errors.lastname}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">
              Nationality:
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                onChange={handleInput}
                value={form.nacionality}
                type="text"
                name="nacionality"
                placeholder="Write..."
              />
            </div>
            <div className=" text-red-400 font-mono text-sm">
              {errors.nationality}
            </div>
          </div>
          <div className="block text-sm font-medium leading-6">
            <label>Birthdate:</label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                onChange={handleInput}
                value={form.birthdate}
                type="date"
                name="birthdate"
                id="birthdate"
                placeholder="Write..."
              />
            </div>
            <div className=" text-red-400 font-mono text-sm">
              {errors.birthdate}
            </div>
          </div>
        </fieldset>

        <fieldset className="bg-cyan-950 px-4 border rounded-md pb-4 my-4">
          <legend>
            <h3 className="sm:text-lg text-[red] sm:font-bold text-base font-semibold leading-7">
              Additional Information
            </h3>
          </legend>

          <div>
            <label
              className="block text-sm font-medium leading-6"
              htmlFor="teams"
            >
              Teams:
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                onChange={handleInput}
                name="teams"
                id="teams"
              >
                <option value="------">------</option>
                {teams?.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {inputTeam.length ? inputTeam.map((e) => e) : null}
          <button onClick={addTeam}>+</button>

          <div>
            <label className="block text-sm font-medium leading-6">
              Image:
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-3 ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                onChange={handleInput}
                value={form.image}
                name="image"
                type="text"
                placeholder="https://img.freepik.com/vector-premium/coche-corredor-dibujos-animados_74102-1526.jpg"
              />
            </div>
            <div className=" text-red-400 font-mono text-sm">
              {errors.image}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">
              Description:
            </label>
            <div className="mt-2">
              <textarea
                className="px-3 h-[100px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base "
                onChange={handleInput}
                value={form.description}
                name="description"
                cols="30"
                rows="10"
                placeholder="Write..."
              ></textarea>
            </div>
            <div className=" text-red-400 font-mono text-sm">
              {errors.description}
            </div>
          </div>
        </fieldset>

        <button
          className=" mx-auto active:outline sm:hover:outline  px-11 py-3 rounded-xl bg-gradient-to-tl from-red-700 via-red-600 to-blue-700 text-xl"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="sm:flex sm:flex-col sm:justify-center">
        <span className=" text-cyan-400 font-bold text-lg">Preview:</span>
        <Card
          isForm="true"
          name={form.name}
          image={form.image}
          Teams={form.Teams}
        />
      </div>
    </div>
  );
}

export default Form;
