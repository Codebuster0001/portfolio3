import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
    clearAllUserErrors,
    clearMessage,
    logout,
    resetProfile,
    updatePassword,
} from "../../store/slices/userSlice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("New password and confirm password do not match.");
    }

    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      dispatch(resetProfile());
      dispatch(clearMessage());
      dispatch(logout());
      navigate("/login");
    }
  }, [isUpdated, dispatch, navigate]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Current Password */}
      <div className="grid gap-2 relative">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type={showCurrent ? "text" : "password"}
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500"
          onClick={() => setShowCurrent((prev) => !prev)}
        >
          {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="grid gap-2 relative">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type={showNew ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500"
          onClick={() => setShowNew((prev) => !prev)}
        >
          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm New Password */}
      <div className="grid gap-2 relative">
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input
          id="confirmNewPassword"
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500"
          onClick={() => setShowConfirm((prev) => !prev)}
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePassword;
