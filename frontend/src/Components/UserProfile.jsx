import { Settings } from "lucide-react";

function UserProfile() {
  return (
    <div className="p-4 border-t border-white/[0.06]">
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1A1D24] cursor-pointer transition-colors">
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full h-9 w-9"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFEn3rJIBd7maW7EE3DVH0tAlGIpnuDIsauTUrslthKv9_GjFriOPeFSrPtXuySFpVrzGSDkzAOU6tqFEHZrY6HVQ9rw9jRPlyH1javC-w7--dPxT2Df5k5xhe6cIrjNEiiUi6_S5IE1bRdX02E4S5kJbXvgRn2Qd3S4o8XqQLrcyVSxJpo2Gb2J4wuQMYuekUCSlvIW988bp5z570OqQfhHjhh3-nwyShdD8pM5paEm8tROXcwzPQRBKGF-J77-RUcSCUFBkDGzg")',
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            Alex Morgan
          </p>
          <p className="text-xs text-gray-400 truncate">Product Designer</p>
        </div>
        <Settings className="text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}

export default UserProfile;
