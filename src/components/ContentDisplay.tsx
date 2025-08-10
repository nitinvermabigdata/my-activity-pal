import { Card } from "@/components/ui/card";
import { Calendar, CheckSquare, Clock, Users } from "lucide-react";
import meetingImage from "@/assets/meeting-illustration.jpg";
import jiraImage from "@/assets/jira-illustration.jpg";

interface ContentDisplayProps {
  contentType: 'meeting' | 'jira' | null;
}

export const ContentDisplay = ({ contentType }: ContentDisplayProps) => {
  if (!contentType) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto opacity-50">
            <Users size={32} className="text-primary-foreground" />
          </div>
          <h3 className="text-lg font-medium text-text-secondary">Ask me anything</h3>
          <p className="text-text-muted max-w-md">
            I'll show relevant information here based on our conversation about your meetings, Jira tickets, and daily activities.
          </p>
        </div>
      </div>
    );
  }

  if (contentType === 'meeting') {
    return (
      <div className="p-6 space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Your Meetings</h2>
        </div>

        {/* Meeting Illustration */}
        <Card className="glass-card p-6 overflow-hidden">
          <img 
            src={meetingImage} 
            alt="Meeting Overview" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-medium text-text-primary mb-2">Today's Schedule</h3>
          <p className="text-text-secondary text-sm">
            Here's an overview of your meetings and calendar events. Your n8n workflow will provide real-time data.
          </p>
        </Card>

        {/* Meeting Cards */}
        <div className="space-y-3">
          <Card className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">Team Standup</h4>
                <p className="text-sm text-text-secondary">Daily synchronization meeting</p>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Clock size={16} />
                <span className="text-sm">9:00 AM</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">Project Review</h4>
                <p className="text-sm text-text-secondary">Q4 milestone discussion</p>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Clock size={16} />
                <span className="text-sm">2:00 PM</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">Client Call</h4>
                <p className="text-sm text-text-secondary">Weekly progress update</p>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Clock size={16} />
                <span className="text-sm">4:30 PM</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (contentType === 'jira') {
    return (
      <div className="p-6 space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <CheckSquare size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Jira Tickets</h2>
        </div>

        {/* Jira Illustration */}
        <Card className="glass-card p-6 overflow-hidden">
          <img 
            src={jiraImage} 
            alt="Jira Overview" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-medium text-text-primary mb-2">Current Sprint</h3>
          <p className="text-text-secondary text-sm">
            Your active tickets and sprint progress. Data will be fetched from your n8n Jira integration.
          </p>
        </Card>

        {/* Ticket Cards */}
        <div className="space-y-3">
          <Card className="glass-card p-4 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">PROJ-123</h4>
                <p className="text-sm text-text-secondary">Fix login authentication issue</p>
              </div>
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                High Priority
              </span>
            </div>
          </Card>

          <Card className="glass-card p-4 border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">PROJ-124</h4>
                <p className="text-sm text-text-secondary">Update user dashboard design</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                Medium Priority
              </span>
            </div>
          </Card>

          <Card className="glass-card p-4 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">PROJ-125</h4>
                <p className="text-sm text-text-secondary">Write API documentation</p>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                Low Priority
              </span>
            </div>
          </Card>

          <Card className="glass-card p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary">PROJ-126</h4>
                <p className="text-sm text-text-secondary">Implement new search feature</p>
              </div>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                In Progress
              </span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};