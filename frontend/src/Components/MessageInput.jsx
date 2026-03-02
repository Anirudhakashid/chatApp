import { Send, PlusCircle, Smile, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const { sendMessage, selectedUser } = useChatStore();

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();

    if (!text.trim() && !imagePreview) {
      toast.error("message cannot be empty!");
      return;
    }

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file type");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="bg-[#0F1115] border-t border-white/[0.06] p-3 md:p-5 lg:p-5 2xl:p-6 pb-4 md:pb-6 lg:pb-6 shrink-0">
        <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div className="bg-[#0A0A0B] border border-white/[0.06] rounded-lg flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-all">
            {imagePreview && (
              <div className="px-4 pt-3">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-white/10"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="bg-transparent border-none text-white placeholder-gray-400 w-full focus:ring-0 focus:outline-none px-4 py-3 lg:px-4 lg:py-3.5 text-sm lg:text-base resize-none min-h-[48px] lg:min-h-[52px]"
              placeholder={`Message to ${selectedUser.fullName}`}
              rows={1}
            />
            <div className="flex items-center justify-between px-2 pb-2 lg:px-2.5 lg:pb-2.5">
              <div className="flex items-center gap-1 lg:gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <PlusCircle className="w-5 h-5 lg:w-5 lg:h-5" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="relative" ref={emojiPickerRef}>
                  <button
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Smile className="w-5 h-5 lg:w-5 lg:h-5" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-10 left-0 z-50">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme="dark"
                        width={300}
                        height={400}
                        searchDisabled={false}
                        skinTonesDisabled
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 lg:p-2 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageInput;
