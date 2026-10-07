import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import { LogIn } from "lucide-react";

type LocationState = { from?: { pathname: string } };

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as LocationState)?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    login(username, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error desconocido"),
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-start bg-linear-to-r from-gray-100 to-slate-200">
      <div className="w-screen h-18 flex shrink-0 items-center justify-between">
        <img
          className="h-18 py-2 px-4"
          src="https://www.vittal.com.ar/gestion/wp-content/uploads/2020/02/logo-vittal.svg"
        />
      </div>

      <div className="flex flex-row w-full items-center justify-evenly gap-4 mt-8">
        <div className="flex flex-col h-full items-start justify-items-start">
          <h2 className="text-3xl font-bold text-black">
            Sistema administrativo
          </h2>
          <h3>
            <span className="text-lg font-bold text-black">Ex DTM</span>
          </h3>
        </div>
        <div className="bg-white flex flex-col w-100 items-center gap-4 p-4 rounded-lg shadow-md">
          <div className="flex flex-row items-center gap-2 border-b border-vblue-0 w-full justify-center">
            <img
              className="w-8 h-8"
              src="https://www.vittal.com.ar/assets/img/icon-emergencia.svg"
            />
            <h1 className="text-blue mx-auto text-3xl font-bold p-2">
              Acceso a la aplicación
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-row w-full items-center justify-end border-t border-vblue-0 pt-2">
              <button
                type="submit"
                className={`flex flex-row items-center px-2 py-2 rounded-lg bg-vgreen-0 text-white hover:cursor-pointer ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <LogIn className="inline-block w-5 h-5 mr-2" />
                {submitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
