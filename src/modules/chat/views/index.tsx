import { useState } from "react";
import { ChatSidebar } from "../components/ChatSidebar";
import { MessageArea } from "../components/MessageArea";
import { mockConversations, mockMessagesByConversation } from "@/shared/data/mockChats";

const Chat = () => {
  const [activeId, setActiveId] = useState(mockConversations[0].id);
  const [conversations, setConversations] = useState(mockConversations);
  const [messagesByConversation, setMessagesByConversation] = useState(mockMessagesByConversation);
  
  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSendMessage = (text: string) => {
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
    <div className="flex flex-1 flex-col lg:flex-row gap-[24px] lg:gap-[48px] px-20 py-8 bg-bg-primary h-[calc(100vh-64px)] overflow-hidden justify-center">
      <div className="flex flex-col gap-[24px]">
        <h1 className="text-[24px] font-bold text-[#251455] ml-1">Messages</h1>
        <ChatSidebar
          activeId={activeId}
          conversations={conversations}
          onSelectConversation={(id) => setActiveId(id)}
        />
      </div>
      <MessageArea
        activeConversation={activeConversation}
        messages={messagesByConversation[activeId] || []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;