import React, { useState } from "react";
import { Link } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Google sign-in");
  };

  return (
    <div className="min-h-screen w-full bg-layout-content flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to continue your conversations
          </p>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-transparent border border-gray-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-3 hover:bg-gray-700/30 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6324 8.19531H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6107 15.0875V17.5867H16.8251C18.7175 15.8445 19.8055 13.2719 19.8055 10.2292Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20.0008C12.9517 20.0008 15.2727 19.1056 16.8251 17.5867L13.6107 15.0875C12.7363 15.6972 11.6098 16.0431 10.2002 16.0431C7.54672 16.0431 5.29498 14.283 4.52734 11.9172H1.22852V14.4923C2.81668 17.8797 6.34336 20.0008 10.2002 20.0008Z"
              fill="#34A853"
            />
            <path
              d="M4.52734 11.9172C4.10969 10.6753 4.10969 9.32766 4.52734 8.08578V5.51074H1.22852C-0.409507 8.66766 -0.409507 12.3355 1.22852 15.4923L4.52734 11.9172Z"
              fill="#FBBC04"
            />
            <path
              d="M10.2002 3.95805C11.687 3.93555 13.1179 4.47149 14.2026 5.45805L17.0256 2.73055C15.1827 0.997422 12.7363 0.0455489 10.2002 0.0678239C6.34336 0.0678239 2.81668 2.18883 1.22852 5.51075L4.52734 8.08578C5.29498 5.71992 7.54672 3.95805 10.2002 3.95805Z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-gray-500 text-sm">Or continue with email</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-[#1e1f24] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-white text-sm font-medium">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-[#1e1f24] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
          >
            Log in
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
