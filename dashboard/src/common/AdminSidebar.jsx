// src/components/common/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, UserCog, BadgeCheck, FolderGit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Profile",
    path: "about",
    icon: <UserCog className="w-5 h-5" />,
  },
  {
    name: "Skills",
    path: "skills",
    icon: <BadgeCheck className="w-5 h-5" />,
  },
  {
    name: "Projects",
    path: "projects",
    icon: <FolderGit2 className="w-5 h-5" />,
  },
];

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <aside className="hidden lg:flex flex-col bg-white border-r text-black h-screen w-64 px-6 py-6 shadow-md sticky top-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-1">
        <div>
        <h2 className="text-lg font-semibold cursor-pointer text-gray-800">
                  <Link
                    to="/"
                    className="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >
                    {user?.fullName
                      ? `Welcome, ${user.fullName.split(" ")[0]}`
                      : "Admin Panel"}
                  </Link>
                  </h2>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>
        <LayoutDashboard className="w-6 h-6 text-gray-500" />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 border-l-4 ${
                isActive
                  ? "bg-gray-100 text-blue-600 border-blue-500"
                  : "text-gray-700 hover:bg-gray-50 hover:text-black border-transparent"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Admin Dashboard
      </div>
    </aside>
  );
};

export default AdminSidebar;
