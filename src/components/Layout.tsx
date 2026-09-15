import clsx from "clsx";
import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <aside className="w-full h-16 bg-vwhite-0 border-b border-surface-3/30 flex shrink-0 items-center justify-between">
        <div className="flex gap-2 items-center">
          <img
            className="h-12 p-2"
            src="https://www.vittal.com.ar/gestion/wp-content/uploads/2020/02/logo-vittal.svg"
          />

          <nav className="flex gap-1 py-2 px-2">
            <NavLink
              key={"home"}
              to={"/"}
              end={true}
              className={({ isActive }: { isActive: boolean }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-2xl transition-colors text-sm",
                  isActive
                    ? "bg-vgreen-0 text-white font-bold"
                    : "text-muted hover:text-white hover:bg-vgreen-0",
                )
              }
            >
              <span className="hidden lg:block font-bold">HOME</span>
            </NavLink>
            <NavLink
              key={"TOPEECOM"}
              to={"/topeecom"}
              end={true}
              className={({ isActive }: { isActive: boolean }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-2xl transition-colors text-lg",
                  isActive
                    ? "bg-vgreen-0 text-white font-bold"
                    : "text-muted hover:text-white hover:bg-vgreen-0",
                )
              }
            >
              <span className="hidden lg:block font-bold">Topes Ecommerce</span>
            </NavLink>
          </nav>
        </div>
        <div>
          <h1 className="text-lg font-bold px-4 text-accent-blue">
            CACHE V0.0.1
          </h1>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="w-full mx-auto h-[calc(100dvh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
