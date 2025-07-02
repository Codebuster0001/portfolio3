import { LayoutDashboard, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet";
import { logout } from "../store/slices/userSlice";

const links = [
  { name: "Skills", path: "skill" },
  { name: "Timeline", path: "timeline" },
  { name: "Messages", path: "messages" },
  { name: "Projects", path: "project" },
  { name: "Profile", path: "about" },
];

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <header className="w-full px-6 py-[17.5px] flex justify-between items-center border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-white text-black pt-12 w-[250px]"
          >
            {/* ✅ Accessibility title and description */}
            <SheetTitle className="sr-only">
              Mobile Sidebar Navigation
            </SheetTitle>
            <SheetDescription className="sr-only">
              Admin dashboard navigation menu for smaller screens.
            </SheetDescription>

            {/* Header inside Sheet */}
            <div className="flex items-center mt-5 justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold cursor-pointer text-gray-800">
                  <Link
                    to="/dashboard"
                    className="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >
                    {user?.fullName
                      ? `Welcome, ${user.fullName.split(" ")[0]}`
                      : "Admin Panel"}
                  </Link>
                </h2>
                <p className="text-sm text-gray-400">Dashboard</p>
              </div>
              <LayoutDashboard className="w-6 h-6 text-gray-500" />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `block text-base px-4 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-gray-200 font-semibold"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded-md font-medium"
              >
                Logout
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Title for Large Screens */}
      <h1 className="text-xl font-semibold tracking-wide hidden lg:block">
        Admin Dashboard
      </h1>

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={user?.avatar?.url || "/profile.png"} alt="User" />
            <AvatarFallback>
              {user?.fullName?.slice(0, 2)?.toUpperCase() || "AD"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white text-black border">
          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:bg-red-100 cursor-pointer text-red-500"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AdminHeader;
