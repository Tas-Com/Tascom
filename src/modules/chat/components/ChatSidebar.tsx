import { Link } from '@tanstack/react-router';
import type { ChatConversation } from '@/shared/data/mockChats';

interface ChatSidebarProps {
  onSelectConversation: (id: number) => void;
  activeId: number;
  conversations: ChatConversation[];
}

export function ChatSidebar({ onSelectConversation, activeId, conversations }: ChatSidebarProps) {
  return (
    <div className="w-full md:w-[340px] h-full bg-white rounded-2xl p-4 flex flex-col gap-4 shadow-sm border border-gray-100 overflow-y-auto overflow-x-hidden">
      <div className="space-y-1">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectConversation(chat.id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              chat.id === activeId
                ? 'bg-[#F3F0FF] border border-[#E9E2FF]'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <Link 
              to="/user-profile/$userId" 
              params={{ userId: chat.id.toString() }}
              onClick={(e) => e.stopPropagation()}
              className="relative shrink-0"
            >
              <img
                src={chat.userAvatar}
                alt={chat.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {chat.status === 'new' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-purple rounded-full border-2 border-white" />
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <Link 
                  to="/user-profile/$userId" 
                  params={{ userId: chat.id.toString() }}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[14px] font-semibold text-[#251455] truncate hover:text-brand-purple transition-colors"
                >
                  {chat.userName}
                </Link>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center gap-1">
                <p className="text-[12px] text-gray-500 truncate h-[1.2rem]">{chat.lastMessage}</p>
                {chat.unreadCount && chat.status === 'new' ? (
                  <span className="text-[10px] font-bold text-brand-purple whitespace-nowrap">
                    {chat.unreadCount} new
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">Seen</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
