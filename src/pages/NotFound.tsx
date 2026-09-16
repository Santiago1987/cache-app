import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center space-y-2 items-center">
      <h1 className="text-2xl text-white font-bold">404</h1>
      <p className="text-lg text-white">Esta ruta no existe.</p>
      <Link
        to="/"
        className="flex justify-center items-center w-40 p-2 bg-accent-vgreen border border-accent-vgreen rounded-3xl 
      text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
