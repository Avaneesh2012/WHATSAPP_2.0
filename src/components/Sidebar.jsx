import React, { useState } from 'react'
import { Search, MoreVertical, Plus, MessageCircle, Phone, Video, Info } from 'lucide-react'
import { useChat } from '../contexts/ChatContext'

function Sidebar({ onChatSelect, selectedChat }) {
  const { chats, currentUser } = useChat()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-80 bg-chat-secondary border-r border-chat-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-chat-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold text-chat-text">{currentUser.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-chat-bg rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-chat-textSecondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-chat-textSecondary" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-chat-bg border border-chat-border rounded-lg text-chat-text placeholder-chat-textSecondary focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 mb-2">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-chat-bg rounded-lg transition-colors text-chat-text">
          <div className="w-10 h-10 bg-whatsapp-600 rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`sidebar-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-chat-secondary rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-chat-text truncate">{chat.name}</h3>
                <span className="text-xs text-chat-textSecondary">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-chat-textSecondary truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-whatsapp-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-chat-border">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Chats</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
            <Phone className="w-5 h-5" />
            <span className="text-xs">Calls</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
            <Video className="w-5 h-5" />
            <span className="text-xs">Video</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
            <Info className="w-5 h-5" />
            <span className="text-xs">Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 