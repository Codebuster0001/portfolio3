import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import loginGif from "../assets/login2.gif";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { clearAllUserErrors, login } from "../store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDebug, setShowDebug] = useState(false);
  const [apiStatus, setApiStatus] = useState("Unknown");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  // Test API connection
  const testApiConnection = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL_DASHBOARD || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/v1/user/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setApiStatus("✅ API is accessible");
      } else {
        setApiStatus(`❌ API Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setApiStatus(`❌ Network Error: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");
    
    // Debug: Log the API URL being used
    console.log("API URL:", import.meta.env.VITE_API_URL_DASHBOARD || "http://localhost:5000");
    console.log("Attempting login with:", { email });
    
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-muted-foreground text-center text-sm">
            Enter your credentials to access the dashboard
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

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="text-sm text-center space-y-2">
            <Link to="/password/forgot" className="underline block">
              Forgot your password?
            </Link>
            
            {/* Debug toggle */}
            <button
              type="button"
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-gray-500 underline"
            >
              {showDebug ? "Hide Debug Info" : "Show Debug Info"}
            </button>
            
            {showDebug && (
              <div className="text-xs text-left bg-gray-100 p-2 rounded mt-2 space-y-1">
                <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL_DASHBOARD || "http://localhost:5000"}</p>
                <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
                <p><strong>Error:</strong> {error || "None"}</p>
                <p><strong>API Status:</strong> {apiStatus}</p>
                <button
                  type="button"
                  onClick={testApiConnection}
                  className="text-blue-600 underline"
                >
                  Test API Connection
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted">
        <img
          src={loginGif}
          alt="Login Illustration"
          className="w-3/4 object-cover h-auto"
        />
      </div>
    </div>
  );
};

export default Login;
