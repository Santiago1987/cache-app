import clsx from "clsx";
import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <aside className="w-full h-16 bg-surface-1 border-b border-surface-3/30 flex shrink-0 items-center">
        <h1 className="text-lg font-bold px-4">CACHE V1</h1>

        <nav className="flex gap-1 py-4 px-2">
          <NavLink
            key={"home"}
            to={"/"}
            end={true}
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
                isActive
                  ? "bg-accent-blue/10 text-accent-blue"
                  : "text-muted hover:text-white hover:bg-surface-2",
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
                isActive
                  ? "bg-accent-blue/10 text-accent-blue"
                  : "text-muted hover:text-white hover:bg-surface-2",
              )
            }
          >
            <span className="hidden lg:block font-bold">Topes Ecommerce</span>
          </NavLink>
        </nav>
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
