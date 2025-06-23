import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "@/layout/UserLayout";
import Home from "@/pages/Home";
import ProjectDetails from './pages/ProjectsDetails';
import ProjectAll from './pages/ProjectAll';

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
