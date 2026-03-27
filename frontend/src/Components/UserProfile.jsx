import { LogOut, Settings, UserPen } from "lucide-react";
import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

function UserProfile({ variant = "sidebar" }) {
  const { authUser, logout, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);
  const isPanel = variant === "panel";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg transition-colors ${
        isPanel
          ? "border border-white/[0.06] bg-[#101319] p-4"
          : "cursor-pointer border-t border-white/[0.06] p-4"
      }`}
    >
      <div className="avatar online">
        <div className={`${isPanel ? "w-12 h-12" : "w-8 h-8"} rounded-full`}>
          <img
            src={selectedImg || authUser.profilePic || "/user.png"}
            alt="user image"
            className="bg-center bg-no-repeat bg-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-white truncate ${
            isPanel ? "text-base max-w-full" : "text-sm max-w-[100px]"
          }`}
        >
          {authUser.fullName || ""}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {isPanel ? authUser.email : "Online"}
        </p>
      </div>
      <div
        className={`dropdown ${
          isPanel ? "dropdown-left" : "dropdown-top dropdown-left"
        }`}
      >
        <div
          tabIndex={0}
          role="button"
          className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Settings className="w-5 h-5" />
        </div>
        <ul
          tabIndex={0}
          className={`dropdown-content menu rounded-2xl border border-white/[0.08] bg-[#11131a] text-white z-[1] w-56 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] gap-2 ${
            isPanel ? "mr-2" : "mb-2"
          }`}
        >
          <li>
            <button
              onClick={() => fileInputRef.current.click()}
              className=" hover:text-blue-400"
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <UserPen />
              <p className="text-white font-sans font-medium">
                Update profile pic
              </p>
            </button>
          </li>
          <li>
            <button onClick={() => logout()} className="hover:text-red-400">
              <LogOut />
              <p className="text-white font-sans font-medium">Log out</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;
