import { useState, useEffect } from "react";
import { FaUser, FaLock, FaEdit } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

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
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed h-full w-[220px] md:w-[250px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 z-20 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary">Account Settings</h2>
            <button
              className="md:hidden p-1 rounded hover:bg-muted"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/10 text-primary shadow"
                      : "hover:bg-muted text-muted-foreground"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-background p-2 rounded-lg border shadow"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-[250px] p-4 md:p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight capitalize text-zinc-800 dark:text-white">
              {currentRoute}
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your {currentRoute} settings below.
            </p>
          </div>

          {/* Page Content */}
          <section className="bg-card border border-border rounded-2xl shadow-md p-6 transition-all">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Account;
