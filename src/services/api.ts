// la idea de esta linea es crear un error personalizado para poder identificarlo en el front y redirigir al login si es necesario
export class UnauthorizedError extends Error {}

const apiCall = async <T = unknown>(
  fn: string,
  paramters: unknown,
): Promise<T> => {
  const res = await fetch("/api/call", {
    method: "POST",
    credentials: "include", //para incluir la cookie de sesión en la petición
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ function: fn, paramters }), //el user nunca se especifica lo pone el proxy
  });

  if (res.status === 401) throw new UnauthorizedError("Usuario no autorizado");
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Error desconocido: ${res.status}`); //captura el error devuelto por cache
  }

  return res.json() as Promise<T>;
};

export default apiCall;
