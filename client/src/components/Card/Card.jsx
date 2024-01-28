import { Link, NavLink } from "react-router-dom"

function Card({id,image,name,Teams, isForm}) {
    return (
      <div className="sm:mb-0 shadow-[4px_5px_18px_red] w-60 pt-1 bg-[#f4e7e5] text-[#430301] font-bold rounded-2xl p-2 text-center mb-4">
        <NavLink to={isForm?'':`/detail/${id}`}>
        <h2 className="hover:text-lg" >Name: {name}</h2>
        <img className="h-[300px] w-full object-cover hover:outline hover:outline-black" src={image} alt={name} />
        </NavLink>
        <h3>Escuderías: {Teams}</h3>
      </div>
    )
  }
  export default Card