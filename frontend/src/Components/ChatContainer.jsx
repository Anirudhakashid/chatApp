import { useState } from "react";
import {
  Search,
  Info,
  MoreVertical,
  ArrowLeft,
  Send,
  PlusCircle,
  Smile,
} from "lucide-react";

function ChatContainer() {
  const [message, setMessage] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAIXatusJEnhxkvHQT5dbWR1DktrGfpFtMkK3TMWP5-4ChIz4Bm73o0GfMIpFGTMBOuv1FNlXF_XBuEhjXFz-Jkoo3fqZIRn9Y7z2BMMPzbsRJ52tCKAV61cdYFUS5OomddcuKbpmrwwy2NN-qT2Oien6qFCa7LqlSU-lSoe1T8orBwc5G3l_4Fb63DeXpDsAyVBZCV5HwijiLmrb2nHXT6eCB2XNeZQcFSOvVqBfsTOsvlH6d346LlHU2Y-MwxhRVR4uy1jJ4UqKk",
      lastMessage: "Hey team, just pushed the latest updates...",
      time: "10:32 AM",
      online: true,
      active: true,
    },
    {
      id: 2,
      name: "Michael Ross",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfA9iOe4v96Z4vatBgdnrJSwVbOIV0r8x3SpaeSQL8BPBlh_FP2GQ3219hyNXqePdeWx2Gdc0-bfyqHD-daE-gbVDhW4Zv74m5y_sPZSxHvBjKLJ5GL88xHoiDOYj0hvdp5iq508M-zWpawyIYIOftRNrA2qr8m0KDX7mS-8s8_JVbmrlMo8eHCXeuumn2O9Bl2aeo-FPxM4m-M1bueBJRcRDbptQVaH_EV4PhtdXgEsNMsaQ2PgS8MkNn0OLqd_tb4mDFvTm0I_8",
      lastMessage: "One thing though, the font weight...",
      time: "10:35 AM",
      online: false,
      active: false,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDNzld29uwOxg8O24rhv7yoK0yXQTfWVv7cWoKRVNC5O2WkaHztGB0BttOgDmcF7Y0dIw8Ya5bTAukPs9Qk65E0uRSaWE8P4Gn6Z4sz2DXBoSuSreYK7yr9AtUNG3xX23K-xCXoPzay3_ktroeeOfF5lIlS7gLKhyzDjR6nUsZX4Ynr9LcqS0zDtEiAa8KTRy46keAz-FAwN1h9GIMcGgK302qZP8oJZpKTHsMElYrdjlKJ80m544sww6Il5y5Drc6MbCkZdccggLM",
      lastMessage: "Also, are we still on for the design review?",
      time: "10:45 AM",
      online: "away",
      active: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBBD-_giD08UcHnCw7hJ7MX5flxgEnynPovPSFG1bnH9krfep0ru7uHxnj0vkVsv_PBKXrXilIRx04dEH40BeReuwVOHvIxwEfbYreosLg8FJC2qh4kmljLRZKpTTagXgbLt8VJ5URF-iVi1BOPU-xNlsYcKjUQTXRX9Pvs12XAZhh3E7Re1xZB-QvwN8fU9dFzv1mRRatp0yq2UR_-luhfLh-iHLIffXpr00_mUpbU0iR9nxoAvxsslOsVZvyiZF3KPKtyMvVfwMo",
      text: "Hey team, just pushed the latest updates to the staging environment. Let me know if you see any layout shifts on the dashboard.",
      time: "10:32 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "Michael Ross",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7p0EYf9njiE4DwmJA183H3HIQ6ne0mwoGlkkxCw3O_DZBVoLTcXABsQpnd28BP2IUTuTq3rBr1qifpyVrS8rianfW4HHN6G41vRZ-wQthhtmVuOuuNV6A0Y3ennNr61hT_5zOFDFDgirJVpCE0G9jQIYsyl2aFxq7tulgCwtACYfrxOq8qaPYLac3kKTBluBsZl48plrcO4WzCCFzf7mtakYQzAdYYHmTbu0ctV3Gp6OHJlhYUJ0sA_at_loGoVsvKEOYwMNtEWY",
      text: "Checking now. The new dark mode toggle looks slick! 👌",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 3,
      sender: "Michael Ross",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7p0EYf9njiE4DwmJA183H3HIQ6ne0mwoGlkkxCw3O_DZBVoLTcXABsQpnd28BP2IUTuTq3rBr1qifpyVrS8rianfW4HHN6G41vRZ-wQthhtmVuOuuNV6A0Y3ennNr61hT_5zOFDFDgirJVpCE0G9jQIYsyl2aFxq7tulgCwtACYfrxOq8qaPYLac3kKTBluBsZl48plrcO4WzCCFzf7mtakYQzAdYYHmTbu0ctV3Gp6OHJlhYUJ0sA_at_loGoVsvKEOYwMNtEWY",
      text: "One thing though, the font weight on the sidebar seems a bit light compared to the designs.",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7FF8EB8YImGw8a9rrvr9OwYyEDa2jn-CJFFPZliEx54NMs-TgsBoUc-5VFM4vquGf_uOAcWYUSwf9Oyq4iX2VOgotXYxV4Dp3nrckOSEUIpPXAtIHui-PyMstem09m8PHbIqlCdIsF5gBQwAWowl4sEZ1K7l8rdg4VPcbWvYBImPv0HRDPxDhBbEcd4NWNU9V7CCdb2exi1pPA8bxiw65XIhCnG53Q_uSLpP7zfvaXmOAGly6zHsMOGq97qgwyNYeHghtfDn0smo",
      text: "Good catch, Michael. I might have missed overriding the default Tailwind weight. I'll patch it in a bit.",
      time: "10:42 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Emma Wilson",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAC07oC8u0qUPzUqpJXVjNG24mTSlp7dIayWUdKwBKv0ldLVKi-J53CGQnvOddGYdkafbJoPkE4IUVWlzLUiJxXgYYWUTCZwl2yOpmHE0Ce1GK_Xjfo17agXCZyUuXllzSXLu5yzaQ1tChxJRBVKUh1Td-UrFPEfculD0sFiO5TSRYIi6Jl4wfZAKFI3TVCUCV-QDWL6RCFLgyZ1970FhKaQRIxONgxkWUHpz7AqYvfEA3EnXufYTUyyMqTlWDF4yldifYLWIYofSc",
      text: "Also, are we still on for the design review at 2 PM?",
      time: "10:45 AM",
      isOwn: false,
    },
  ];

  const handleSend = () => {};

  return (
    <>
      {/* Header */}
      <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0A0B] sticky top-0 z-10">
        <div className="flex items-center gap-3 md:gap-4">
          <button className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="relative">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 md:h-10 md:w-10"
              style={{ backgroundImage: `url(${contacts[0].avatar})` }}
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0A0A0B] lg:hidden" />
          </div>
          <div>
            <h2 className="text-white text-sm md:text-base font-semibold leading-tight">
              Sarah Chen
            </h2>
            <p className="text-green-500 text-[10px] md:text-xs">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-gray-400">
          <button className="hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
            <Info className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="lg:hidden hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
            <MoreVertical className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col">
        <div className="flex items-center justify-center my-2">
          <div className="h-px bg-white/[0.06] w-full max-w-[80px] md:max-w-[120px]" />
          <span className="mx-4 text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider">
            Today
          </span>
          <div className="h-px bg-white/[0.06] w-full max-w-[80px] md:max-w-[120px]" />
        </div>

        {messages.map((msg, idx) => {
          const showAvatar =
            idx === 0 ||
            messages[idx - 1].sender !== msg.sender ||
            messages[idx - 1].isOwn !== msg.isOwn;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 md:gap-4 group ${msg.isOwn ? "flex-row-reverse" : ""}`}
            >
              {showAvatar ? (
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 md:h-10 md:w-10 shrink-0 mt-1"
                  style={{ backgroundImage: `url(${msg.avatar})` }}
                />
              ) : (
                <div className="h-8 w-8 md:h-10 md:w-10 shrink-0" />
              )}
              <div
                className={`flex flex-col gap-1 max-w-[85%] md:max-w-[70%] ${
                  msg.isOwn ? "items-end" : ""
                }`}
              >
                {showAvatar && (
                  <div
                    className={`flex items-baseline gap-2 ${
                      msg.isOwn ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-xs md:text-sm font-semibold text-white">
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {msg.time}
                    </span>
                  </div>
                )}
                <div
                  className={`p-3 md:p-3.5 rounded-lg ${
                    msg.isOwn
                      ? "bg-blue-600 text-white rounded-tr-none text-left"
                      : "bg-[#14161C] text-gray-300 rounded-tl-none"
                  } ${!showAvatar && "mt-1"}`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="h-4" />
      </div>

      {/* Input Area */}
      <div className="bg-[#0F1115] border-t border-white/[0.06] p-3 md:p-5 pb-4 md:pb-6 shrink-0">
        <div className="bg-[#0A0A0B] border border-white/[0.06] rounded-lg flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="bg-transparent border-none text-white placeholder-gray-400 w-full focus:ring-0 focus:outline-none px-4 py-3 text-sm resize-none min-h-[48px]"
            placeholder="Message Sarah Chen"
            rows={1}
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1">
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                <PlusCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
