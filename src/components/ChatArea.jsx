import React, { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Search } from 'lucide-react'
import { useChat } from '../contexts/ChatContext'
import Message from './Message'

function ChatArea({ chat }) {
  const { messages, sendMessage, markAsRead } = useChat()
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const chatMessages = messages[chat.id] || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    markAsRead(chat.id)
  }, [chat.id, chatMessages.length, markAsRead])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(chat.id, newMessage.trim())
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-chat-bg">
      {/* Chat Header */}
      <div className="bg-chat-secondary border-b border-chat-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-chat-text">{chat.name}</h2>
              <p className="text-sm text-chat-textSecondary">
                {chat.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center text-chat-textSecondary mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-chat-secondary border-t border-chat-border p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text"
          >
            <Smile className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-chat-bg rounded-lg transition-colors text-chat-textSecondary hover:text-chat-text"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full px-4 py-2 bg-chat-bg border border-chat-border rounded-lg text-chat-text placeholder-chat-textSecondary focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-whatsapp-600 hover:bg-whatsapp-700 disabled:bg-chat-border disabled:cursor-not-allowed rounded-lg transition-colors text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatArea 