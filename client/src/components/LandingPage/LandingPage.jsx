import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing flex justify-center items-center bg-cover bg-no-repeat h-screen bg-center ">
      <div className=" gap-8 text-white flex flex-col items-center">
        <h1 className="text-6xl font-bold">WELCOME</h1>
        <Link to="/home">
          <button className=" active:outline sm:hover:outline  px-11 py-3 rounded-xl bg-gradient-to-tl from-red-700 via-red-600 to-blue-700 text-xl ">Entrar</button>
        </Link>
      </div>
    </div>
  );
}
