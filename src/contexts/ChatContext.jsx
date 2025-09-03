import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ChatContext = createContext()

const initialState = {
  chats: [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'The meeting is at 3 PM tomorrow',
      timestamp: '9:15 AM',
      unreadCount: 0,
      online: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the help!',
      timestamp: 'Yesterday',
      unreadCount: 1,
      online: true
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Can you send me the files?',
      timestamp: 'Yesterday',
      unreadCount: 0,
      online: false
    }
  ],
  messages: {
    1: [
      { id: 1, text: 'Hey there!', sender: 'them', timestamp: '10:25 AM' },
      { id: 2, text: 'Hi! How are you?', sender: 'me', timestamp: '10:26 AM' },
      { id: 3, text: 'I\'m doing great, thanks! How about you?', sender: 'them', timestamp: '10:27 AM' },
      { id: 4, text: 'Pretty good! Just working on some projects', sender: 'me', timestamp: '10:28 AM' },
      { id: 5, text: 'That sounds interesting! What kind of projects?', sender: 'them', timestamp: '10:29 AM' },
      { id: 6, text: 'Mostly web development stuff. Building a new app', sender: 'me', timestamp: '10:30 AM' },
      { id: 7, text: 'Hey, how are you doing?', sender: 'them', timestamp: '10:30 AM' }
    ],
    2: [
      { id: 1, text: 'Hi Sarah!', sender: 'me', timestamp: '9:00 AM' },
      { id: 2, text: 'Hello! Are you ready for tomorrow\'s meeting?', sender: 'them', timestamp: '9:05 AM' },
      { id: 3, text: 'Yes, I\'ve prepared the presentation', sender: 'me', timestamp: '9:10 AM' },
      { id: 4, text: 'Perfect! The meeting is at 3 PM tomorrow', sender: 'them', timestamp: '9:15 AM' }
    ],
    3: [
      { id: 1, text: 'Hey Mike, can you help me with this bug?', sender: 'me', timestamp: '2:00 PM' },
      { id: 2, text: 'Sure! What\'s the issue?', sender: 'them', timestamp: '2:05 PM' },
      { id: 3, text: 'The login form isn\'t working properly', sender: 'me', timestamp: '2:10 PM' },
      { id: 4, text: 'I think I know what it is. Let me check', sender: 'them', timestamp: '2:15 PM' },
      { id: 5, text: 'Thanks for the help!', sender: 'them', timestamp: 'Yesterday' }
    ],
    4: [
      { id: 1, text: 'Hi Emily!', sender: 'me', timestamp: '11:00 AM' },
      { id: 2, text: 'Hello! How\'s the project going?', sender: 'them', timestamp: '11:05 AM' },
      { id: 3, text: 'It\'s going well! Almost finished', sender: 'me', timestamp: '11:10 AM' },
      { id: 4, text: 'That\'s great! Can you send me the files?', sender: 'them', timestamp: 'Yesterday' }
    ]
  },
  currentUser: {
    id: 'me',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
}

function chatReducer(state, action) {
  switch (action.type) {
    case 'SEND_MESSAGE':
      const { chatId, message } = action.payload
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      return {
        ...state,
        messages: {
          ...state.messages,
          [chatId]: [...(state.messages[chatId] || []), newMessage]
        },
        chats: state.chats.map(chat => 
          chat.id === chatId 
            ? { ...chat, lastMessage: message, timestamp: newMessage.timestamp, unreadCount: 0 }
            : chat
        )
      }
    
    case 'RECEIVE_MESSAGE':
      const { chatId: receivedChatId, message: receivedMessage, sender } = action.payload
      const receivedNewMessage = {
        id: Date.now(),
        text: receivedMessage,
        sender: sender || 'them',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      return {
        ...state,
        messages: {
          ...state.messages,
          [receivedChatId]: [...(state.messages[receivedChatId] || []), receivedNewMessage]
        },
        chats: state.chats.map(chat => 
          chat.id === receivedChatId 
            ? { 
                ...chat, 
                lastMessage: receivedMessage, 
                timestamp: receivedNewMessage.timestamp,
                unreadCount: chat.unreadCount + 1
              }
            : chat
        )
      }
    
    case 'MARK_AS_READ':
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat.id === action.payload 
            ? { ...chat, unreadCount: 0 }
            : chat
        )
      }
    
    default:
      return state
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const sendMessage = (chatId, message) => {
    dispatch({ type: 'SEND_MESSAGE', payload: { chatId, message } })
  }

  const receiveMessage = (chatId, message, sender) => {
    dispatch({ type: 'RECEIVE_MESSAGE', payload: { chatId, message, sender } })
  }

  const markAsRead = (chatId) => {
    dispatch({ type: 'MARK_AS_READ', payload: chatId })
  }

  const value = {
    ...state,
    sendMessage,
    receiveMessage,
    markAsRead
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
} 