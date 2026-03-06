import {
  MoreVertical,
  ChevronLeft,
  Mic,
  Send,
  Plus,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import type { ChatMessage, ChatConversation } from "@/shared/data/mockChats";
import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Link } from "@tanstack/react-router";

interface MessageAreaProps {
  messages: ChatMessage[];
  activeConversation: ChatConversation | undefined;
  onSendMessage: (text: string) => void;
}

export function MessageArea({
  messages,
  activeConversation,
  onSendMessage,
}: MessageAreaProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeConversation) return null;

  return (
    <div className="flex-1 lg:max-w-[914px] h-full bg-white rounded-[8px] shadow-sm border border-gray-100 flex flex-col overflow-hidden p-[16px]">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-1">
            <ChevronLeft size={24} className="text-[#251455]" />
          </button>
          <Link
            to="/user-profile/$userId"
            params={{ userId: activeConversation.id.toString() }}
            className="relative hover:opacity-80 transition-opacity"
          >
            <img
              src={activeConversation.userAvatar}
              alt={activeConversation.userName}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </Link>
          <div>
            <Link
              to="/user-profile/$userId"
              params={{ userId: activeConversation.id.toString() }}
              className="text-[16px] font-semibold text-[#251455] hover:text-brand-purple transition-colors"
            >
              {activeConversation.userName}
            </Link>
            <p className="text-[12px] text-green-500 font-medium">Active Now</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Messages History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.date && (
              <div className="flex justify-center my-4">
                <span className="text-[11px] text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {msg.date}
                </span>
              </div>
            )}
            <div
              className={`flex flex-col ${
                msg.isSentByMe ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-end gap-2 max-w-[70%]">
                {!msg.isSentByMe && (
                  <Link
                    to="/user-profile/$userId"
                    params={{ userId: activeConversation.id.toString() }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={activeConversation.userAvatar}
                      className="w-8 h-8 rounded-full object-cover mb-1"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                )}
                <div
                  className={`p-3 rounded-2xl text-[14px] whitespace-pre-wrap ${
                    msg.isSentByMe
                      ? "bg-[#F3F0FF] text-[#251455] rounded-br-none border border-[#E9E2FF]"
                      : "bg-gray-50 text-[#251455] rounded-bl-none border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[10px] text-gray-400">{msg.time}</span>
                {msg.isSentByMe && (
                  <span className="text-[10px] text-gray-400 lowercase">
                    {msg.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-gray-50 relative">
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
          <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <PopoverTrigger asChild>
              <button
                className={`transition-colors ${
                  isMenuOpen
                    ? "text-brand-purple"
                    : "text-gray-400 hover:text-brand-purple"
                }`}
              >
                <Plus size={24} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="start"
              className="w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-bottom-2"
            >
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-[#F3F0FF] rounded-lg transition-colors text-[#251455] text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <ImageIcon size={18} className="text-brand-purple" />
                Upload Image
              </button>
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-[#F3F0FF] rounded-lg transition-colors text-[#251455] text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={18} className="text-brand-purple" />
                Upload File
              </button>
            </PopoverContent>
          </Popover>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[14px] text-[#251455] py-2 placeholder:text-gray-400"
          />
          <button className="text-gray-400 hover:text-brand-purple">
            <Mic size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-9 h-9 bg-brand-purple text-white rounded-full flex items-center justify-center hover:bg-brand-purple-dark transition-colors ${!inputText.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Send size={18} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
