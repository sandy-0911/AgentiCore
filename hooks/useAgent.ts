
import { useState, useCallback } from 'react';
import type { Content } from '@google/genai';
import { runAgent } from '../services/agentService';
import { Message, MessageRole, MessageContent } from '../types';

export const useAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: MessageRole.MODEL,
      content: "Hello! I'm AgentiCore. I can help you with GPU monitoring, model performance estimates, and more. How can I assist you today?",
    },
  ]);
  const [history, setHistory] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), role: MessageRole.USER, content: userMessage }]);
    setIsLoading(true);

    const updateCallback = (role: 'model' | 'tool', content: any) => {
        let newRole: MessageRole;
        let finalContent: MessageContent;

        if(role === 'tool'){
            newRole = MessageRole.TOOL;
            finalContent = content;
        } else {
            newRole = MessageRole.MODEL;
            finalContent = content;
        }
        
        setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role: newRole, content: finalContent }]);
    };
    
    try {
      const newHistory = await runAgent(userMessage, history, updateCallback);
      setHistory(newHistory);
    } catch (error) {
      console.error("Failed to get response from agent:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: MessageRole.MODEL, content: "An error occurred. Please try again." }]);
    } finally {
      setIsLoading(false);
    }

  }, [history]);

  return { messages, isLoading, sendMessage };
};
