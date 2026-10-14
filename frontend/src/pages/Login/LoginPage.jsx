import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Input, Loader, logo, userApi } from "../../components/index.js";
import { useAuth } from "../../hooks/useAuth.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const successMessage = location.state?.message;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await userApi.loginUser(formData);
      console.log("Login successful:", response.data);

      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      }

      // Redirect to home page after successful login
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-full max-w-md border border-fuchsia-900 mt-4">

        <div className="text-center mb-5">
          <img
            src={logo}
            alt="MyTube Logo"
            className="mx-auto w-12 h-12 mb-3"
          />
          <h2 className="text-xl font-semibold mt-2 mb-1">
            Welcome Back to MyTube
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to continue watching and sharing videos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Success Message from registration */}
          {successMessage && !error && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input
            type="email"
            name="email"
            placeholder="muhammadkhan@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Forgot password */}
          <div className="text-right text-sm">
            <Link
              to="/users/forgot-password"
              className="text-purple-600 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            name="Sign In"
            className="w-full"
          />

          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/users/register"
              className="text-purple-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
