import Header from "@/common/Header";
import Footer from "@/common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => (
  <div className="min-h-screen flex flex-col ">
    <Header />
    <main className="mt-20">
      <Outlet />
   
    </main>
    <Footer />
  </div>
);

export default UserLayout;
