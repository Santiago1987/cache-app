Migracion de DTM.

- Esta app es una SPA pensada para reemplazar para establecer conexion con CACHE y reemplazar asi el entorno visual que actualmente se usa DTM.
  La tecnologia usada es REACT junto con TypeScript.
  Las comunicacion con CACHE es mediante un proxy, una API (.NET 9) que traduce de REST->SOAP->REST, esto es debido a que estamos limitados a usar CACHE version 2005, por eso el endpoint siempre es el mismo "/api/call".

-V0.0.1: inicio, configuraciones iniciales, DEMO y prueba de concepto.

-V0.0.2: autentifiacion de usuario y refactor de componentes.
