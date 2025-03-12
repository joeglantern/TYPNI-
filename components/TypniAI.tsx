'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageSquare, Send, X, Loader2, RefreshCw, Download, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

// Add this component at the top of the file, before the TypniAI component
const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 items-center">
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
      />
    </div>
  );
};

export default function TypniAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('typni-chat-history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
        setDefaultWelcomeMessage();
      }
    } else {
      setDefaultWelcomeMessage();
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('typni-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  const setDefaultWelcomeMessage = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm Typni AI, your assistant for The Young Peoples' Network International. How can I help you today?",
        id: 'welcome-message'
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(prev => {
            // If previous input ends with a space or is empty, don't add another space
            const separator = prev.endsWith(' ') || prev === '' ? '' : ' ';
            return prev + separator + finalTranscript;
          });
        } else if (interimTranscript) {
          // Show interim results in a different way if needed
          console.log('Interim transcript:', interimTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };
      
      recognitionRef.current.onend = () => {
        // Only stop listening if the user manually stopped it
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!speechSupported) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    // Add user message to chat with unique ID
    const userMessageId = `user-${Date.now()}`;
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      id: userMessageId
    }]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Get the last 5 messages for context (or fewer if there aren't 5)
      // This helps keep the context size manageable for the API
      const recentMessages = messages.slice(-5);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          history: recentMessages
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.response) {
        // Add assistant response to chat with unique ID
        const assistantMessageId = `assistant-${Date.now()}`;
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response, 
          id: assistantMessageId 
        }]);
        
        // If there was a warning, show it but don't treat it as an error
        if (data.warning) {
          console.warn('API Warning:', data.warning);
        }
      } else {
        // Handle API error
        const errorMsg = data.error || 'An error occurred while processing your request';
        const details = data.details ? ` (${data.details})` : '';
        setError(`${errorMsg}${details}`);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.', 
          id: `error-${Date.now()}` 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Network error. Please check your connection and try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered a network error. Please check your connection and try again.', 
        id: `error-${Date.now()}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setDefaultWelcomeMessage();
    setError(null);
    setInput('');
    inputRef.current?.focus();
    // Clear localStorage when starting a new chat
    localStorage.removeItem('typni-chat-history');
  };

  const exportChatHistory = () => {
    if (messages.length === 0) return;
    
    // Format the chat history
    const formattedChat = messages.map(msg => {
      const role = msg.role === 'user' ? 'You' : 'Typni AI';
      let content = `${role}: ${msg.content}`;
      return content;
    }).join('\n\n');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `typni-chat-${timestamp}.txt`;
    
    // Create a blob and download link
    const blob = new Blob([formattedChat], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Animation variants
  const chatButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0 10px 25px -5px rgba(89, 0, 153, 0.5)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Chat button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              variants={chatButtonVariants}
              className="fixed bottom-6 right-6 z-50"
            >
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary-600 transition-all duration-300 flex items-center justify-center"
                    aria-label="Open Typni AI Chat"
                  >
                    <MessageSquare className="h-6 w-6" />
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden">
                  <DialogHeader className="px-4 py-3 border-b bg-primary text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="relative w-10 h-10 overflow-hidden rounded-full bg-white p-1"
                          initial={{ rotate: -10 }}
                          animate={{ rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                          <Image
                            src="/logo.png"
                            alt="TYPNI Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                          />
                        </motion.div>
                        <div>
                          <DialogTitle className="text-lg font-bold">Typni AI</DialogTitle>
                          <p className="text-xs text-primary-100 opacity-90">Your TYPNI assistant</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={exportChatHistory}
                                className="text-white hover:bg-primary-600"
                                aria-label="Export Chat"
                                disabled={messages.length === 0}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Export Chat</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={startNewChat}
                                className="text-white hover:bg-primary-600"
                                aria-label="Start New Chat"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Start New Chat</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <DialogClose asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-white hover:bg-primary-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          variants={messageVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          layout
                        >
                          {message.role === 'assistant' && (
                            <motion.div 
                              className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                              <Image
                                src="/logo.png"
                                alt="TYPNI Logo"
                                width={32}
                                height={32}
                                className="object-contain bg-white p-1"
                              />
                            </motion.div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === 'user'
                                ? 'bg-primary text-white rounded-tr-none'
                                : 'bg-white dark:bg-gray-800 shadow-sm rounded-tl-none'
                            }`}
                          >
                            {/* Display message content */}
                            {message.role === 'user' ? (
                              message.content
                            ) : (
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {message.content}
                                </ReactMarkdown>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isLoading && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <Image
                            src="/logo.png"
                            alt="TYPNI Logo"
                            width={32}
                            height={32}
                            className="object-contain bg-white p-1"
                          />
                        </div>
                        <div className="max-w-[80%] rounded-lg p-3 bg-white dark:bg-gray-800 shadow-sm rounded-tl-none flex items-center gap-2">
                          <TypingIndicator />
                        </div>
                      </motion.div>
                    )}
                    
                    {error && (
                      <motion.div 
                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      >
                        <p>Error: {error}</p>
                        <p className="mt-1">Please try again or refresh the page.</p>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input area */}
                  <div className="p-4 border-t bg-white dark:bg-gray-950">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 border-primary/20 focus-visible:ring-primary"
                        disabled={isLoading || isListening}
                      />
                      
                      {/* Voice input button */}
                      {speechSupported && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={toggleListening}
                                variant="outline"
                                size="icon"
                                className={`${isListening ? 'bg-red-100 text-red-600 border-red-300' : 'border-primary/20'}`}
                                disabled={isLoading}
                              >
                                {isListening ? (
                                  <MicOff className="h-4 w-4" />
                                ) : (
                                  <Mic className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>{isListening ? 'Stop listening' : 'Start voice input'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          onClick={handleSend} 
                          disabled={isLoading || input.trim() === ''}
                          className="bg-primary hover:bg-primary-600 text-white"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </motion.div>
                    </div>
                    
                    <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                      Typni 2025
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Chat with Typni AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
} 