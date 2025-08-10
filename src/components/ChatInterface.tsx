import { useState, useRef, useEffect } from "react";
import "../types/speech.d.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  isActive: boolean;
  onContentChange: (type: 'meeting' | 'jira' | null) => void;
}

export const ChatInterface = ({ isActive, onContentChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. I can help you with your meetings, Jira tickets, and daily activities. You can type or speak to me! What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setInputValue(transcript);

        // If the result is final, send the message
        if (event.results[event.results.length - 1].isFinal) {
          setIsListening(false);
          if (transcript.trim()) {
            handleSendMessage(transcript);
          }
        }
      };

      recognitionInstance.onerror = (event) => {
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive"
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate thinking time
    setTimeout(() => {
      let aiResponse = "";
      let contentType: 'meeting' | 'jira' | null = null;

      if (userMessage.toLowerCase().includes('meeting')) {
        aiResponse = "I can see you have several meetings today. Let me show you your upcoming schedule and recent meeting details.";
        contentType = 'meeting';
      } else if (userMessage.toLowerCase().includes('jira') || userMessage.toLowerCase().includes('ticket')) {
        aiResponse = "Here are your current Jira tickets and their status. I can help you prioritize and manage them.";
        contentType = 'jira';
      } else {
        aiResponse = "I'm here to help! You can ask me about your meetings, Jira tickets, or any other daily activities. Feel free to type or speak to me.";
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      onContentChange(contentType);
    }, 1500);
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    if (!isActive) {
      toast({
        title: "Avatar not active",
        description: "Please activate the AI assistant first by clicking 'Let's Talk'",
        variant: "destructive"
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    simulateAIResponse(textToSend);
    setInputValue("");
  };

  const startListening = () => {
    if (!isActive) {
      toast({
        title: "Avatar not active",
        description: "Please activate the AI assistant first",
        variant: "destructive"
      });
      return;
    }

    if (!recognition) {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive"
      });
      return;
    }

    try {
      recognition.start();
    } catch (error) {
      toast({
        title: "Speech Recognition Error",
        description: "Could not start speech recognition",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-gradient-primary' 
                  : 'bg-gradient-to-r from-accent to-accent-light'
              }`}>
                {message.sender === 'user' ? 
                  <User size={16} className="text-primary-foreground" /> : 
                  <Bot size={16} className="text-white" />
                }
              </div>

              {/* Message Bubble */}
              <div className={`${
                message.sender === 'user' ? 'message-user' : 'message-ai'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start fade-in">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="message-ai">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/30">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isListening 
                ? "Listening... Speak now" 
                : isActive 
                  ? "Ask me about your meetings, Jira tickets... or click mic to speak" 
                  : "Activate the assistant first"
            }
            className={`flex-1 glass-button border-border/40 text-text-primary placeholder:text-text-muted ${
              isListening ? 'border-green-400 bg-green-400/10' : ''
            }`}
            disabled={!isActive || isListening}
          />
          
          {/* Voice Input Button */}
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={!isActive}
            className={`glass-button glow-effect px-4 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
            }`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
          
          {/* Send Button */}
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || !isActive || isListening}
            className="glass-button glow-effect px-4"
          >
            <Send size={18} />
          </Button>
        </div>
        
        {/* Voice Status */}
        {isListening && (
          <div className="mt-2 flex items-center justify-center space-x-2 text-green-400 text-sm fade-in">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Listening for your voice...</span>
          </div>
        )}
      </div>
    </div>
  );
};