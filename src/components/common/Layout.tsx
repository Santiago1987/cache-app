import clsx from "clsx";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { House, LogOut } from "lucide-react";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-row">
      <aside className="h-screen w-40 bg-vwhite-0 border-b border-surface-3/30 flex flex-col shrink-0 items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          <img
            className="h-18 py-2 px-4"
            src="https://www.vittal.com.ar/gestion/wp-content/uploads/2020/02/logo-vittal.svg"
          />

          <nav className="flex flex-col w-full">
            <NavLink
              key={"home"}
              to={"/"}
              end={true}
              className={({ isActive }: { isActive: boolean }) =>
                clsx(
                  "flex items-center gap-3 py-2 px-3 transition-colors text-lg border-t border-surface-3/30 border-b hover:bg-vgreen-0 hover:text-white",
                  isActive ? "bg-white text-black" : "text-muted",
                )
              }
            >
              <House className="h-5 w-5" />
              <span className="hidden lg:block">HOME</span>
            </NavLink>

            <NavLink
              key={"TOPEECOM"}
              to={"/topeecom"}
              end={true}
              className={({ isActive }: { isActive: boolean }) =>
                clsx(
                  "flex items-center gap-3 py-2 px-3 transition-colors text-lg hover:bg-vgreen-0 hover:text-white",
                  isActive ? "bg-white text-black" : "text-muted",
                )
              }
            >
              <span className="hidden lg:block">Topes Ecommerce</span>
            </NavLink>
          </nav>
        </div>
        <div className="flex flex-col gap-1 items-center">
          {user ? (
            <button
              className="text-lg font-bold px-4 py-2 rounded-lg bg-black text-white hover:bg-vgreen-1 hover:cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="inline-block w-5 h-5 mr-2" />
              Logout
            </button>
          ) : null}
          <div className="flex flex-col ml-auto px-4 text-muted lg:block">
            <h3>CACHE V0.0.2</h3>
            <span className="text-xs">build {__COMMIT_HASH__}</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="w-full mx-auto h-[calc(100dvh)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
