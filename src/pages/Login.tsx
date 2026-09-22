import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router";

type LocationState = { from?: { pathname: string } };

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as LocationState)?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username);
    navigate(from, { replace: true });
  };

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="flex items-center bg-vblue-0 p-2">
        <img
          className="w-8 h-8"
          src="https://www.vittal.com.ar/assets/img/icon-emergencia.svg"
        />
        <h1 className="text-white mx-auto text-3xl font-bold p-2">Login</h1>
      </div>
      <div className="bg-white flex flex-col w-[60%] items-center gap-4 p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[70%]">
          <label
            htmlFor="username"
            className="flex flex-col gap-1 font-bold text-lg"
          >
            Usuario
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Ingrese su usuario"
              className="px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col gap-1 font-bold text-lg"
          >
            Contraseña
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su contraseña"
              className="px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="px-3 py-2 w-[70%] mx-auto rounded-lg bg-vgreen-0 text-white hover:bg-vgreen-1 hover:cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
