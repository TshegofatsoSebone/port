import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Tshegofatso's AI assistant. Ask me anything about his skills, projects, or experience.", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText, timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Pass the updated message list including the new user message
      const responseText = await sendMessageToGemini(newMessages);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
          rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none h-0'}
        `}
        style={{ maxHeight: '600px', display: isOpen ? 'flex' : 'none', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span className="font-semibold">Portfolio Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 h-80 sm:h-96">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[80%] p-3 rounded-2xl text-sm 
                  ${msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-none'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700">
                <Loader2 size={16} className="animate-spin text-indigo-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my projects..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
          flex items-center justify-center w-14 h-14 rounded-full
          ${isOpen ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default AIChat;