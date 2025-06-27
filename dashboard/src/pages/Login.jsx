// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login, clearAllUserErrors } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
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
      toast.success("Login successful");
      navigate("/");
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
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
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/password/forgot"
                    className="text-sm text-muted-foreground underline hover:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted">
        <img
          src="/placeholder.svg"
          alt="Login Illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
