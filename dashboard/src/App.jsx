import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";

import { getUser } from "./store/slices/userSlice";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/subcomponents/Account";
import Profile from "./pages/subcomponents/Profile";
import UpdateProfile from "./pages/subcomponents/UpdateProfile";
import UpdatePassword from "./pages/subcomponents/UpdatePassword";
import AddTimeline from "./pages/subcomponents/AddTimeline";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="about/*" element={<Account />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>
          <Route path="timeline" element={<AddTimeline />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
