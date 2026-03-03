import { useState } from "react";
import { ChatSidebar } from "../components/ChatSidebar";
import { MessageArea } from "../components/MessageArea";
import { mockConversations, mockMessagesByConversation } from "@/shared/data/mockChats";
import { EmptyState } from "@/shared/components/ui/EmptyState";

const Chat = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState(conversations.length > 0 ? conversations[0].id : null);
  const [messagesByConversation, setMessagesByConversation] = useState(mockMessagesByConversation);
  
  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSendMessage = (text: string) => {
    if (activeId === null) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      senderId: 0,
      text: text,
      time: timeNow,
      isSentByMe: true,
      status: "sent" as const,
    };

    // Update messages
    setMessagesByConversation(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage]
    }));

    // Update last message in sidebar
    setConversations(prev => prev.map(conv => 
      conv.id === activeId 
        ? { ...conv, lastMessage: text, time: timeNow, status: "seen" } 
        : conv
    ));
  };

  return (
    <div className="flex flex-1 flex-col px-20 py-8 bg-bg-primary h-[calc(100vh-64px)] overflow-hidden">
      <h1 className="text-[24px] font-bold text-[#251455] mb-6">Messages</h1>

      {conversations.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[48px] h-full overflow-hidden">
          <ChatSidebar
            activeId={activeId || 0}
            conversations={conversations}
            onSelectConversation={(id) => setActiveId(id)}
          />
          <MessageArea
            activeConversation={activeConversation}
            messages={activeId !== null ? (messagesByConversation[activeId] || []) : []}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-[8px] shadow-sm border border-gray-100 flex items-center justify-center p-[16px]">
          <EmptyState 
            imageSrc="/empty-messages.png" 
            message="You don't have any messages yet"
            imageClassName="w-[400px]"
          />
        </div>
      )}
    </div>
  );
};

export default Chat;