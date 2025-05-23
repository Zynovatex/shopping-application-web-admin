'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type ChatWindowProps = {
  userId: string;
};

type MessageType = {
  sender: string;
  text: string;
  timestamp: string;
  imageUrl?: string;
  status?: 'sent' | 'seen';
};

// Mock messages per user ID for demo/testing
const mockMessages: { [key: string]: MessageType[] } = {
  '1': [
    { sender: 'admin', text: 'Hi John, how can I help you?', timestamp: '10:01 AM', status: 'seen' },
    { sender: 'user', text: 'I have a problem with my shop.', timestamp: '10:03 AM' },
  ],
  '2': [
    { sender: 'admin', text: 'Hi Doe, how can I help you?', timestamp: '09:45 AM', status: 'sent' },
  ],
};

export default function ChatWindow({ userId }: ChatWindowProps) {
  // Messages state, initialized with mock data for given userId
  const [messages, setMessages] = useState<MessageType[]>(mockMessages[userId] ?? []);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock online status for users
  const mockOnlineStatus: { [key: string]: boolean } = {
    '1': true,
    '2': false,
  };

  // Handle image file input and convert to data URL for preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Send message with optional image, timestamped
  const sendMessage = () => {
    if (!input.trim() && !image) return; // Prevent empty send
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: MessageType = {
      sender: 'admin',
      text: input,
      timestamp: time,
      status: 'sent',
      ...(image && { imageUrl: image }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setImage(null);
    setIsTyping(false);
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show message when userId is invalid or no conversation found
  if (!mockMessages[userId]) {
    return (
      <div className="border rounded-xl flex items-center justify-center h-[500px] bg-white shadow text-gray-400">
        No conversation selected or user not found
      </div>
    );
  }

  return (
    <div className="border rounded-xl flex flex-col h-[500px] max-h-[80vh] bg-white shadow">
      {/* Header with online status */}
      <div className="border-b px-4 py-3 flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            mockOnlineStatus[userId] ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
        <span className="text-sm font-medium text-gray-700">
          {mockOnlineStatus[userId] ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.sender === 'admin' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                  msg.sender === 'admin'
                    ? 'bg-[#5A31F5] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
                {msg.imageUrl && (
                  <div className="mt-2">
                    <Image
                      src={msg.imageUrl}
                      alt="attachment"
                      width={180}
                      height={100}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
                {msg.sender === 'admin' && msg.status && (
                  <span className="text-xs text-gray-400">
                    {msg.status === 'seen' ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <div className="px-4 text-sm text-gray-500 italic">User is typing...</div>
      )}

      {/* Input area with attachment and send button */}
      <div className="border-t p-4 flex items-center gap-2 relative">
        <label className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
          📎
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsTyping(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 p-2 rounded-full text-sm outline-none focus:ring-1 focus:ring-[#5A31F5]"
        />

        <button
          onClick={sendMessage}
          className="bg-[#5A31F5] text-white px-5 py-2 rounded-full text-sm hover:bg-[#4827C4]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
