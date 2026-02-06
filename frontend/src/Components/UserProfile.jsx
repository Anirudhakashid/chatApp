import { LogOut, Settings, UserPen } from "lucide-react";
import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

function UserProfile() {
  const { authUser, logout, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

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
    <div className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors  border-t border-white/[0.06]">
      <div className="avatar online">
        <div className="w-8 h-8 rounded-full">
          <img
            src={selectedImg || authUser.profilePic || "/user.png"}
            alt="user image"
            className="bg-center bg-no-repeat bg-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white max-w-[100px] truncate">
          {authUser.fullName || ""}
        </p>
        <p className="text-xs text-gray-400 truncate">Online</p>
      </div>
      <div className="dropdown dropdown-right dropdown-end">
        <div tabIndex={0} role="button">
          <Settings />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-2"
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
