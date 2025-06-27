import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  forgotPassword,
  clearAllForgotResetPassErrors,
} from "@/store/slices/forgotResetPasswordSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleSubmit = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }
    if (message) {
      toast.success(message);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, message, isAuthenticated]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
          <p className="text-muted-foreground text-center text-sm">
            Enter your email address to receive a reset link
          </p>

          <div className="space-y-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link to="/login" className="underline">
              Remember your password? Login
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted">
        <img src="/forgot.png" alt="Forgot" className="w-3/4 h-auto" />
      </div>
    </div>
  );
};

export default ForgotPassword;
