import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import { getUser } from "@/store/slices/userSlice";
import ProtectedRoute from "@/components/ProtectedRoute";

// 🔹 Lazy-loaded pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const AdminLayout = lazy(() => import("@/layout/AdminLayout"));

// 🔹 Lazy-loaded subpages
const Account = lazy(() => import("@/pages/subcomponents/Account"));
const Profile = lazy(() => import("@/pages/subcomponents/Profile"));
const UpdateProfile = lazy(() => import("@/pages/subcomponents/UpdateProfile"));
const UpdatePassword = lazy(() =>
  import("@/pages/subcomponents/UpdatePassword")
);
const Timeline = lazy(() => import("@/pages/Timeline"));
const AddTimeline = lazy(() => import("@/pages/subcomponents/AddTimeline"));
const Messages = lazy(() => import("@/pages/subcomponents/Messages"));
const ReplyMessage = lazy(() => import("@/pages/subcomponents/ReplyMessage"));
const Projects = lazy(() => import("@/pages/Projects"));
const AddProject = lazy(() => import("@/pages/subcomponents/AddProject"));
const Skill = lazy(() => import("@/pages/Skill"));
const AddSkill = lazy(() => import("@/pages/subcomponents/AddSkill"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
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
      </Suspense>
    </>
  );
};

export default App;
