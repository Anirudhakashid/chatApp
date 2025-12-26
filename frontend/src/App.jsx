import React from "react";
import { Route, Routes } from "react-router";
import ChatPage from "./Pages/ChatPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import AuthLayout from "./Layouts/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
