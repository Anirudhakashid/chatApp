import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock } from "lucide-react";
import { signupSchema } from "../schemas/authSchema";
import { useAuthStore } from "../store/useAuthStore";

function SignupPage() {
  const { signup, isSigningIn } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema), mode: "onBlur" });

  //* the react hook form automatically passes the form-data to the onSubmit
  const onSubmit = async (data) => {
    //signup API
    signup(data);
  };

  return (
    <div className="min-h-screen w-full bg-layout-content flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Create an account
          </h1>
          <p className="text-gray-400 text-sm">
            Start connecting with friends and family
          </p>
        </div>

        {/* signup Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* full name field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full bg-[#1e1f24] border ${
                  errors.fullName ? "border-red-500" : "border-gray-700"
                } text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-500`}
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="email"
                placeholder="name@company.com"
                className={`w-full bg-[#1e1f24] border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-500`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full bg-[#1e1f24] border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-500`}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* signup Button */}
          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
          >
            {isSigningIn ? (
              <div className="flex justify-center items-center gap-2">
                Creating Account
                <span className="loading loading-dots loading-sm"></span>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
