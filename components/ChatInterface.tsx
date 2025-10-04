import React, { useState, useRef, useEffect } from 'react';
import { useAgent } from '../hooks/useAgent';
import { Message, MessageRole, GpuStatus } from '../types';
import GpuMetricsChart from './GpuMetricsChart';
import { UserIcon, CpuChipIcon, SparklesIcon, PaperAirplaneIcon, CubeTransparentIcon } from './Icons';
import Loader from './Loader';

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  const renderContent = () => {
    if (typeof message.content === 'string') {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }
    if (typeof message.content === 'object' && message.content !== null) {
      if ('functionCall' in message.content) {
        const fc = message.content.functionCall;
        return (
          <div className="text-xs text-fuchsia-300/80">
            <p><strong>Tool Call:</strong> {fc.name}</p>
            <p><strong>Arguments:</strong> {JSON.stringify(fc.args)}</p>
          </div>
        );
      }
      if ('toolResult' in message.content) {
        if ('gpuStatus' in message.content && message.content.gpuStatus) {
            return <GpuMetricsChart data={message.content.gpuStatus as GpuStatus} />;
        }
        return (
            <div className="text-xs text-cyan-300/80 bg-black/30 p-2 rounded-md">
                <pre><code>{typeof message.content.toolResult === 'string' ? message.content.toolResult : JSON.stringify(message.content.toolResult, null, 2)}</code></pre>
            </div>
        )
      }
    }
    return null;
  };

  const getIcon = () => {
    switch (message.role) {
      case MessageRole.USER:
        return <UserIcon className="w-6 h-6 text-lime-400" />;
      case MessageRole.MODEL:
        // FIX: Check if message.content is an object before using 'in' operator.
        return typeof message.content === 'object' && message.content && 'functionCall' in message.content ? 
            <CubeTransparentIcon className="w-6 h-6 text-fuchsia-400 animate-pulse" /> : 
            <SparklesIcon className="w-6 h-6 text-fuchsia-400" />;
      case MessageRole.TOOL:
        return <CpuChipIcon className="w-6 h-6 text-cyan-400" />;
      default:
        return null;
    }
  };

  const bubbleStyles = {
    [MessageRole.USER]: 'bg-gray-800/60 self-end border border-lime-500/30',
    [MessageRole.MODEL]: 'bg-gray-800/60 self-start border border-fuchsia-500/30',
    [MessageRole.TOOL]: 'bg-transparent self-start w-full md:w-2/3 lg:w-1/2',
  };

  return (
    <div className={`flex items-start gap-3 w-full my-2 ${message.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
      {message.role !== MessageRole.USER && <div className="flex-shrink-0">{getIcon()}</div>}
      <div className={`max-w-xl p-3 rounded-lg shadow-lg ${bubbleStyles[message.role]}`}>
        {renderContent()}
      </div>
      {message.role === MessageRole.USER && <div className="flex-shrink-0">{getIcon()}</div>}
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50 border border-fuchsia-500/20 rounded-lg shadow-[0_0_25px_rgba(217,70,239,0.15)] overflow-hidden">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg, index) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <Loader />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-fuchsia-500/30 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AgentiCore..."
          className="w-full bg-gray-800 text-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-fuchsia-800/50 text-white p-2 rounded-full transition duration-300 shadow-[0_0_10px_rgba(217,70,239,0.5)] disabled:shadow-none"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;