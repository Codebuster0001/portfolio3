import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";

import { getUser } from "./store/slices/userSlice";

// Layout and Pages
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/subcomponents/Account";
import Profile from "./pages/subcomponents/Profile";
import UpdateProfile from "./pages/subcomponents/UpdateProfile";
import UpdatePassword from "./pages/subcomponents/UpdatePassword";
import Timeline from "./pages/Timeline";
import AddTimeline from "./pages/subcomponents/AddTimeline";
import Messages from "./pages/subcomponents/Messages";
import Skills from "./pages/Skills";
import AddSkill from "./pages/subcomponents/AddSkill";
import AddProject from "./pages/subcomponents/AddProject";
import Projects from "./pages/Projects";


const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Helper component to protect routes
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated && !loading) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="about/*" element={<Account />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>

          <Route path="timeline" element={<Timeline />} />
          <Route path="timeline/addtimeline" element={<AddTimeline />} />

          <Route path="messages" element={<Messages />} />
          <Route path="skill" element={<Skills />} />
          <Route path="skill/addskill" element={<AddSkill />} />

          <Route path="project" element={<Projects />} />
          <Route path="project/addproject" element={<AddProject />} />
          <Route path="/dashboard/project/edit/:id" element={<AddProject />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
