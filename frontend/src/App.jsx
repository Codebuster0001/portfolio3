import UserLayout from "@/layout/UserLayout";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import ProjectAll from "./pages/ProjectAll";
import ProjectDetails from "./pages/ProjectsDetails";

const App = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectAll />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
