import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  resetPassword,
  clearAllForgotResetPassErrors,
} from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearAllForgotResetPassErrors());
      dispatch(getUser());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, message, isAuthenticated, dispatch, navigate]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Reset Password</h1>
          <p className="text-muted-foreground text-center text-sm">
            Set your new password
          </p>

          <div className="space-y-4">
            {/* Password Field */}
            <div className="space-y-1">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <Label>Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted">
        <img src="/reset.png" alt="Reset" className="w-3/4 h-auto" />
      </div>
    </div>
  );
};

export default ResetPassword;
