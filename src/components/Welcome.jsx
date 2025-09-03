import React from 'react'
import { MessageCircle, Shield, Zap, Users } from 'lucide-react'

function Welcome() {
  return (
    <div className="flex-1 flex items-center justify-center bg-chat-bg">
      <div className="text-center max-w-md mx-auto px-6">
        {/* WhatsApp Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-whatsapp-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-whatsapp-600 mb-2">WhatsApp 2.0</h1>
          <p className="text-lg text-chat-textSecondary">Next Generation Messaging</p>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-chat-text mb-3">
            Welcome to the future of messaging
          </h2>
          <p className="text-chat-textSecondary leading-relaxed">
            Select a chat from the sidebar to start messaging, or create a new conversation to connect with friends and family.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-chat-secondary rounded-lg">
            <Shield className="w-8 h-8 text-whatsapp-500 mx-auto mb-2" />
            <h3 className="font-medium text-chat-text mb-1">End-to-End Encryption</h3>
            <p className="text-xs text-chat-textSecondary">Your messages are secure</p>
          </div>
          <div className="text-center p-4 bg-chat-secondary rounded-lg">
            <Zap className="w-8 h-8 text-whatsapp-500 mx-auto mb-2" />
            <h3 className="font-medium text-chat-text mb-1">Lightning Fast</h3>
            <p className="text-xs text-chat-textSecondary">Instant message delivery</p>
          </div>
          <div className="text-center p-4 bg-chat-secondary rounded-lg">
            <Users className="w-8 h-8 text-whatsapp-500 mx-auto mb-2" />
            <h3 className="font-medium text-chat-text mb-1">Group Chats</h3>
            <p className="text-xs text-chat-textSecondary">Connect with multiple people</p>
          </div>
          <div className="text-center p-4 bg-chat-secondary rounded-lg">
            <MessageCircle className="w-8 h-8 text-whatsapp-500 mx-auto mb-2" />
            <h3 className="font-medium text-chat-text mb-1">Rich Media</h3>
            <p className="text-xs text-chat-textSecondary">Share photos, videos & more</p>
          </div>
        </div>

        {/* Get Started */}
        <div className="bg-gradient-to-r from-whatsapp-600 to-whatsapp-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Ready to get started?</h3>
          <p className="text-whatsapp-100 mb-4">
            Choose a conversation from the sidebar or start a new chat to begin messaging.
          </p>
          <div className="w-16 h-1 bg-white rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

export default Welcome 