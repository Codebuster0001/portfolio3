import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import loginGif from "@/assets/login2.gif"; // Make sure this is a valid image (GIF/PNG/JPG)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Provide Email and Password!");
      return;
    }
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Form Section */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="border border-gray-200 rounded-md p-8 w-full max-w-md">
          <div className="grid gap-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your email to log in to your account
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/password/forgot" className="text-sm underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex items-center justify-center bg-muted">
        <img
          src={loginGif}
          alt="Login Illustration"
          className="w-3/4 h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
