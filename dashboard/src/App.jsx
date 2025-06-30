// App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes,Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import { getUser } from "@/store/slices/userSlice";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AdminLayout from "@/layout/AdminLayout";

// Sub-pages
import Account from "@/pages/subcomponents/Account";
import Profile from "@/pages/subcomponents/Profile";
import UpdateProfile from "@/pages/subcomponents/UpdateProfile";
import UpdatePassword from "@/pages/subcomponents/UpdatePassword";
import Timeline from "@/pages/Timeline";
import AddTimeline from "@/pages/subcomponents/AddTimeline";
import Messages from "@/pages/subcomponents/Messages";
import ReplyMessage from "@/pages/subcomponents/ReplyMessage";
import Projects from "@/pages/Projects";
import AddProject from "@/pages/subcomponents/AddProject";
import Skill from "@/pages/Skill";
import AddSkill from "@/pages/subcomponents/AddSkill";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser()); // Load user on app mount or refresh
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Redirect root to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="about" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>

          <Route path="timeline" element={<Timeline />} />
          <Route path="timeline/addtimeline" element={<AddTimeline />} />
          <Route path="messages" element={<Messages />} />
          <Route path="message/:id" element={<ReplyMessage />} />
          <Route path="skill" element={<Skill />} />
          <Route path="skill/add" element={<AddSkill />} />
          <Route path="project" element={<Projects />} />
          <Route path="project/addproject" element={<AddProject />} />
          <Route path="project/edit/:id" element={<AddProject />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
