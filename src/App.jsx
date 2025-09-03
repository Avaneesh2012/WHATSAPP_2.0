import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import Welcome from './components/Welcome'
import { ChatProvider } from './contexts/ChatContext'

function App() {
  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <ChatProvider>
      <Router>
        <div className="flex h-screen bg-chat-bg">
          <Sidebar onChatSelect={setSelectedChat} selectedChat={selectedChat} />
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <ChatArea chat={selectedChat} />
            ) : (
              <Welcome />
            )}
          </div>
        </div>
      </Router>
    </ChatProvider>
  )
}

export default App 