import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import avatarImage from "@/assets/ai-avatar.jpg";

interface AIAvatarProps {
  isActive: boolean;
  onToggle: () => void;
}

export const AIAvatar = ({ isActive, onToggle }: AIAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Avatar Container */}
      <div 
        className={`avatar-container ${isActive ? 'active pulse-glow' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={avatarImage} 
          alt="AI Assistant Avatar" 
          className="w-full h-full object-cover rounded-full"
        />
        
        {/* Status Indicator */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background transition-all duration-300 ${
          isActive ? 'bg-green-400 shadow-glow' : 'bg-gray-400'
        }`}>
          {isActive && (
            <div className="w-full h-full rounded-full bg-green-400 animate-ping" />
          )}
        </div>
      </div>

      {/* Let's Talk Button */}
      <Button
        onClick={onToggle}
        className={`glass-button glow-effect px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700' 
            : 'bg-gradient-primary text-primary-foreground hover:scale-105'
        }`}
      >
        <span className="flex items-center space-x-2">
          {isActive ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isActive ? "Stop Talking" : "Let's Talk"}</span>
        </span>
      </Button>

      {/* Status Text */}
      <p className={`text-sm transition-all duration-300 ${
        isActive ? 'text-green-400 font-medium' : 'text-text-secondary'
      }`}>
        {isActive ? "Listening..." : "Ready to assist"}
      </p>
    </div>
  );
};