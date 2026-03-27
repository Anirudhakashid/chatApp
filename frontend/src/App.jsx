import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import ChatPage from "./Pages/ChatPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import AuthLayout from "./Layouts/AuthLayout";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./Components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div>
      <Toaster />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
