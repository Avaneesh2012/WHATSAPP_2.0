import React from 'react'

function Message({ message }) {
  const isOwnMessage = message.sender === 'me'

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`chat-bubble ${isOwnMessage ? 'sent' : 'received'} animate-fade-in`}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`text-xs mt-1 ${isOwnMessage ? 'text-green-100' : 'text-chat-textSecondary'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}

export default Message 