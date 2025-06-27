// src/pages/subcomponents/Account.jsx
import { useState, useEffect } from "react";
import { FaEdit, FaLock, FaUser } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Profile", path: "/dashboard/about/profile", icon: <FaUser /> },
    {
      label: "Update Profile",
      path: "/dashboard/about/update-profile",
      icon: <FaEdit />,
    },
    {
      label: "Update Password",
      path: "/dashboard/about/update-password",
      icon: <FaLock />,
    },
  ];

  const currentRoute = location.pathname.split("/").pop().replace(/-/g, " ");

  useEffect(() => {
    if (location.pathname === "/dashboard/about") {
      navigate("/dashboard/about/profile", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white dark:bg-gray-900 p-2 rounded shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Fixed Sidebar */}
      <aside
        className={`fixed  h-full w-[220px] lg:w-[250px] bg-white dark:bg-gray-900 shadow-sm z-20 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">
            Account Settings
          </h2>
          <nav className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-semibold shadow"
                      : "hover:text-black hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content (scrolls vertically) */}
      <div className="flex-1 ml-[220px] lg:ml-[250px] h-full overflow-y-auto p-4 md:p-6 scrollbar-hide">
        <div className="max-w-5xl mx-auto space-y-6 pb-24">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white capitalize">
              {currentRoute}
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your {currentRoute} settings
            </p>
          </div>

          <section className="bg-white dark:bg-gray-950 rounded-xl shadow-md p-6">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account;
