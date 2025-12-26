import { Outlet } from "react-router";
import LeftPanel from "../Components/LeftPanel";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <LeftPanel />

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
