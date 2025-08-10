import { useState } from "react";
import { AIAvatar } from "@/components/AIAvatar";
import { ChatInterface } from "@/components/ChatInterface";
import { ContentDisplay } from "@/components/ContentDisplay";

const Index = () => {
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [contentType, setContentType] = useState<'meeting' | 'jira' | null>(null);

  const handleAvatarToggle = () => {
    setIsAvatarActive(!isAvatarActive);
    if (!isAvatarActive) {
      setContentType(null); // Reset content when deactivating
    }
  };

  const handleContentChange = (type: 'meeting' | 'jira' | null) => {
    setContentType(type);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      
      <div className="relative z-10 h-screen flex">
        {/* Left Sidebar - Avatar */}
        <div className="w-80 glass-card border-r border-border/30 flex flex-col">
          <div className="flex-shrink-0 border-b border-border/30">
            <AIAvatar 
              isActive={isAvatarActive} 
              onToggle={handleAvatarToggle}
            />
          </div>
          
          {/* AI Assistant Info */}
          <div className="p-6 space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-text-primary mb-2">
                AI Assistant
              </h2>
              <p className="text-sm text-text-secondary">
                Connected to your n8n workflows for meetings, Jira tickets, and daily activities.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="space-y-2">
              <div className="glass-card p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Today's Meetings</span>
                  <span className="text-sm font-medium text-accent">3</span>
                </div>
              </div>
              <div className="glass-card p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Open Tickets</span>
                  <span className="text-sm font-medium text-accent">7</span>
                </div>
              </div>
              <div className="glass-card p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Status</span>
                  <span className="text-sm font-medium text-green-400">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Chat Interface */}
          <div className="flex-1 glass-card border-r border-border/30">
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-6 border-b border-border/30">
                <h1 className="text-2xl font-bold text-text-primary">
                  Chat with Your AI Assistant
                </h1>
                <p className="text-text-secondary mt-1">
                  Ask about your meetings, Jira tickets, or any daily activities
                </p>
              </div>
              
              <div className="flex-1">
                <ChatInterface 
                  isActive={isAvatarActive}
                  onContentChange={handleContentChange}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Content Display */}
          <div className="w-96 glass-card">
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-6 border-b border-border/30">
                <h2 className="text-lg font-semibold text-text-primary">
                  Relevant Information
                </h2>
                <p className="text-text-secondary text-sm mt-1">
                  Dynamic content based on your conversation
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <ContentDisplay contentType={contentType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
