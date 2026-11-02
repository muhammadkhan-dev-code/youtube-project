import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, logo, Input, Loader } from "../../components/index.js";
import { registerUser } from "../../api/userApi.js";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.avatar) {
      setError("Avatar image is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("avatar", formData.avatar);
      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      await registerUser(data);
      navigate("/users/login", {
        state: { message: "Account created successfully! Please sign in." },
      });
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(msg);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-2xl border border-gray-100 mt-4">

        <div className="text-center mb-6">
          <img src={logo} alt="MyTube Logo" className="mx-auto w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold mt-2">
            Create your MyTube account
          </h2>
          <p className="text-gray-500 text-sm">
            Join our community and start sharing videos
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Muhammad Khan"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label="Username"
              name="username"
              placeholder="muhammadkhandevcode"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="muhammadkhan@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Bio */}
          <div>
            <label className="block mb-2 pl-1 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="px-4 py-3 rounded-2xl bg-white text-black outline-none border border-gray-300 
              focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 
              w-full resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Input
              type="file"
              label="Avatar"
              name="avatar"
              onChange={handleFileChange}
              required
            />
            <Input
              type="file"
              label="Cover Image"
              name="coverImage"
              onChange={handleFileChange}
            />
          </div>

          <Button
            type="submit"
            name="Sign Up"
            className="w-full"
          />

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/users/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
