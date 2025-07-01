import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  forgotPassword,
  clearForgotResetError,
} from "@/store/slices/forgotResetPasswordSlice";

import forgotPasswordGif from "@/assets/Forgotpassword.gif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector((state) => state.forgotReset); // ✅ FIX: correct slice name
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    dispatch(forgotPassword({ email })); // ✅ FIX: Wrap in object
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearForgotResetError());
    }

    if (message) {
      toast.success(message);
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, message, isAuthenticated, dispatch, navigate]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link to="/login" className="underline">
              Remember your password? Login
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted">
        <img
          src={forgotPasswordGif}
          alt="Forgot Illustration"
          className="w-3/4 object-cover h-auto"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
